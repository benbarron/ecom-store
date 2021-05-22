import { ConfigType } from "./type";

export const production = (): ConfigType => ({
  server: {
    mode: 'production',
    http: {
      enabled: false,
    },
    https: {
      enabled: true,
      host: '0.0.0.0',
      port: 443,
    }
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
      host: 'session-storage',
      port: 6379,
    },
  },
  cors: {
    origin: 'https://ecom-ui.benjbarron.com',
    credentials: true,
    allowedHeaders: [
      'Origin', 
      'X-Requested-With', 
      'Content-Type', 
      'Accept'
    ],
  },
  elastic: {
    endpoint: 'http://35.202.58.140:3002/api/as/v1/',
    searchKey: 'search-cy6yzz355bxose95z6n4uk5y',
    privateKey: 'private-u22qtpmoog8pzrbrsjm83kgo',
  },
});
