import { HttpException, Injectable } from '@nestjs/common';
import { AppSearchFactory } from '../search/search-client.factory';
import { AppSearchClient } from '../search/search-client.service';

@Injectable()
export default class StoreService {
  private client: AppSearchClient;

  constructor(factory: AppSearchFactory) {
    this.client = factory.createClient('stores-engine');
  }

  public async searchStores(term: string, page: number, size: number) {
    try {
      return await this.client.search(term, {
        page: {
          current: page,
          size,
        },
      });
    } catch (e) {
      throw new HttpException(e.message, 501);
    }
  }
}
