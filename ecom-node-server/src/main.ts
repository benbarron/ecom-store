import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import session, { SessionOptions } from 'express-session';
import AppModule from './modules/app.module';
import connectRedis from 'connect-redis';
import redis from 'redis';
import https from 'https';
import express from 'express';

const server = express();
const adapter = new ExpressAdapter(server);
const logger = new Logger('NestApplication');
  
NestFactory.create(AppModule, adapter)
  .then(app => {
    const config = app.get(ConfigService);
    const mode = config.get('server.mode');
    
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

    if(config.get('server.https.enabled')) {
      const host = config.get('server.https.host');
      const port = config.get('server.https.port');
      const key = config.get('server.https.key');
      const cert = config.get('server.https.cert');
      const httpsServer = https.createServer({key, cert}, server);
      httpsServer.listen(port, host, () => {
        logger.log(`Server started at https://${host}:${port}`);
        logger.log(`Application running in ${mode} mode`);
      });
    }

    if(config.get('server.http.enabled')) {
      const host = config.get('server.http.host');
      const port = config.get('server.http.port');
      app.listen(port, host, () => {
        logger.log(`Server started at http://${host}:${port}`);
        logger.log(`Application running in ${mode} mode`);
      });
    }
  });