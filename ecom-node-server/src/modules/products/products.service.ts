import { HttpException, Inject, Injectable } from '@nestjs/common';
import { AppSearchFactory } from '../search/search-client.factory';
import { AppSearchClient } from '../search/search-client.service';

@Injectable()
export class ProductsService {
  private client: AppSearchClient;

  constructor(@Inject('AppSearchFactory') factory: AppSearchFactory) {
    this.client = factory.createClient('products-engine');
  }

  public async categorySuggestions(term: string) {
    try {
      const res = await this.client.search(term, {
        page: {
          current: 1,
          size: 10,
        },
      });
      return res;
    } catch (e) {
      throw new HttpException(e.message, 501);
    }
  }

  public async suggestions(term: string) {
    try {
      const res = await this.client.querySuggestion(term, {
        types: {
          documents: {
            fields: ['name', 'manufacturer', 'description'],
          },
        },
      });
      return res.results.documents.map((doc) => doc.suggestion);
    } catch (e) {
      throw new HttpException(e.message, 501);
    }
  }

  public async search(term: string, cat: string, page: number = 1, size: number = 10) {
    try {
      if (cat !== 'all') term = term + ' ' + cat;
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

  public async findById(id: string) {
    try {
      const res = await this.client.getDocuments([id]);
      if (!res.length) {
        throw new HttpException('Product not found', 404);
      }
      return res[0];
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, 501);
    }
  }

  public async findSimilarProducts(id: string): Promise<{ results: any }[]> {
    const product = await this.findById(id);
    const page = {
      current: 1,
      size: 12,
    };
    const queries = [
      {
        query: product.name,
        options: { page },
      },
      {
        query: product.category[0],
        options: { page },
      },
    ];
    const [res1, res2] = await this.client.multiSearch(queries);
    return [...res1.results, ...res2.results];
  }
}
