import { EurekaClient } from "eureka-js-client";

type Mode = 'development' | 'production' |'staging'

type HttpsProtocol = {
  enabled: true,
  host: string,
  port: number,
  key: string,
  cert: string
} | {
  enabled: false,
  host?: string,
  port?: number,
  key?: string,
  cert?: string
}

type HttpProtocol = {
  enabled: true,
  host: string,
  port: number 
} | {
  enabled: false,
  host?: string,
  port?: number 
}


interface Server {
  mode: Mode
  http: HttpProtocol
  https: HttpsProtocol
}

interface Cache {
  type: string
  ttl: number
}

interface SessionStore {
  type: string
  host: string
  port: number
}

interface Session {
  secret: string;
  ttl: number
  store: SessionStore
}

interface ElasticOptions {
  endpoint: string
  searchKey: string
  privateKey: string
}

interface Eureka {
  instance: EurekaClient.EurekaInstanceConfig
  eureka: EurekaClient.EurekaClientConfig
}
export interface CorsOptions {
    origin: string;
    methods?: string | string[];
    allowedHeaders?: string | string[];
    exposedHeaders?: string | string[];
    credentials?: boolean;
    maxAge?: number;
    preflightContinue?: boolean;
    optionsSuccessStatus?: number;
}


export interface ConfigType {
  server: Server
  eureka: Eureka
  cache: Cache
  session: Session
  cors: CorsOptions
  elastic: ElasticOptions
}

