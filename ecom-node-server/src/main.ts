import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import session, { SessionOptions } from 'express-session';
import AppModule from './modules/app.module';
import connectRedis from 'connect-redis';
import redis from 'redis';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { readFileSync } from 'fs';

const httpsOptions = {
  key: readFileSync(process.cwd() + '/ssl/key.pem', 'utf-8'),
  cert: readFileSync(process.cwd() + '/ssl/cert.pem', 'utf-8')
}

const adapter = new FastifyAdapter({ 
  https: httpsOptions 
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, adapter);
  const config = app.get(ConfigService);
  const mode = config.get('server.mode');
  const logger = new Logger('NestApplication');

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

  if (config.get('server.https.enabled')) {
    const host = config.get('server.https.host');
    const port = config.get('server.https.port');
    app.listen(port, host, () => {
      logger.log(`Server started at https://${host}:${port}`);
      logger.log(`Application running in ${mode} mode`);
    });
  }

  if (config.get('server.http.enabled')) {
    const host = config.get('server.http.host');
    const port = config.get('server.http.port');
    app.listen(port, host, () => {
      logger.log(`Server started at http://${host}:${port}`);
      logger.log(`Application running in ${mode} mode`);
    });
  }
}

bootstrap();
