import { ConfigType } from "./type";

export const development = (): ConfigType => ({
  server: {
    mode: 'development',
    http: {
      enabled: true,
      host: '0.0.0.0',
      port: 8080,
    },
    https: {
      enabled: false,
    }
  },
  mongo: {
    uri: 'mongodb+srv://benbarron:secret-password@cluster0.kzpr8.mongodb.net/2fa-db?retryWrites=true&w=majority'
  },
   jwt: {
    secret: 'super-secret-key-123',
    expiration: 100 * 100 * 60 * 60,
  },
  eureka: {
    instance: {
      instanceId: 'PRODUCTS-SERVICE',
      app: 'PRODUCTS-SERVICE',
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      vipAddress: 'products.service',
      port: {
        $: 8080,
        '@enabled': true,
      },
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      servicePath: '/eureka/apps/',
      maxRetries: 10,
      requestRetryDelay: 2000,
      host: '127.0.0.1',
      port: 8761,
    },
  },
  cache: {
    type: 'redis',
    ttl: 60,
  },
  session: {
    secret: 'test-secret-123-abc',
    ttl: 60 * 60 * 24 * 7,
    store: {
      type: 'redis',
      host: '127.0.0.1',
      port: 6379,
    },
  },
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: [
      'Origin', 
      'X-Requested-With', 
      'Content-Type', 
      'Accept',
      'x-auth-token'
    ],
  },
  elastic: {
    endpoint: 'http://35.202.58.140:3002/api/as/v1/',
    searchKey: 'search-cy6yzz355bxose95z6n4uk5y',
    privateKey: 'private-u22qtpmoog8pzrbrsjm83kgo',
  },
});
