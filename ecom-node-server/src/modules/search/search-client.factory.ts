import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppSearchClient } from "./search-client.service";

@Injectable()
export class AppSearchFactory {
  private config: ConfigService
  
  constructor(config : ConfigService) {
    this.config = config;
  }

  public createClient(engine: string) {
      return new AppSearchClient({
      endpoint: this.config.get('elastic.endpoint'),
      apiKey: this.config.get('elastic.privateKey'),
      engine,
    });
  }
}
