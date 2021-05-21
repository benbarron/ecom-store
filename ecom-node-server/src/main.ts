import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import AppModule from './modules/app.module';
import session, { SessionOptions } from 'express-session';
import connectRedis from 'connect-redis';
import redis from 'redis';

NestFactory.create(AppModule).then(app => {
  const config = app.get(ConfigService);
  const host = config.get('server.host');
  const port = config.get('server.port');
  
  const redisClient = redis.createClient({
    host: config.get('session.store.host') as string,
    port: config.get('session.store.port') as number,
  });
  
  const redisStore = new (connectRedis(session))({
    client: redisClient,
    ttl: 86400,
  });
  
  const sessionOptions: SessionOptions = {
    secret: config.get('session.secret'),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: redisStore,
  };
  
  app.enableCors(config.get('cors'));
  app.use(session(sessionOptions));
  app.setGlobalPrefix('/api');
  app.enableShutdownHooks();
  app.listen(port, host);
});