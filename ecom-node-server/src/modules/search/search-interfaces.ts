const SIGNED_SEARCH_TOKEN_JWT_ALGORITHM = 'HS256';

interface QueryOptions {
  page?: any;
}

interface ConfigOptions {
  endpoint: string;
  apiKey: string;
  engine: string;
}