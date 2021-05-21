import { HttpException, Injectable } from '@nestjs/common';
import { AppSearchFactory } from '../search/search-client.factory';
import { AppSearchClient } from '../search/search-client.service';

@Injectable()
export default class CategoryService {
  private client: AppSearchClient;

  constructor(factory: AppSearchFactory) {
    this.client = factory.createClient('categories-engine');
  }

  public async search(term: string, page: number, size: number) {
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

  public async suggestions(term: string) {
    try {
      const res = await this.client.search(term, {
        page: {
          current: 1,
          size: 10,
        },
      });
      return res.results.map((res) => res.name.raw);
    } catch (e) {
      throw new HttpException(e.message, 501);
    }
  }
}
