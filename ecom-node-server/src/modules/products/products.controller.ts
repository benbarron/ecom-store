import {
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  HttpException,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('/products')
export default class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @CacheKey('ProductCategorySuggestion')
  @CacheTTL(20)
  @Get('/category/suggestions')
  public async getProductCategorySuggestions(@Query() query: any) {
    const set = new Set();
    const arr = new Array();
    type Res = { meta: any; results: any[] };
    const res: Res = await this.productsService.categorySuggestions(query.q);
    res.results.forEach((product) => {
      product.category.raw.forEach((category) => {
        if (!set.has(category)) {
          set.add(category);
        }
      });
    });
    for (const v of set.values()) {
      arr.push(v);
    }
    return { suggestions: arr };
  }

  @CacheKey('ProductSuggestions')
  @CacheTTL(20)
  @Get('/suggestions')
  public async getSearchSuggestions(@Query() query: any) {
    const suggestions = await this.productsService.suggestions(query.q);
    return { suggestions };
  }

  @CacheKey('ProductSearch')
  @CacheTTL(20)
  @Get('/search')
  public async getSearchResults(@Query() query: any) {
    query.q = query.q || '';
    query.cat = query.cat || '';
    const q = query.q.split('+').join(' ');
    const cat = query.cat.split('+').join(' ');
    const page = parseInt(query.page);
    const size = parseInt(query.size);
    const res = await this.productsService.search(q, cat, page, size);
    return { meta: res.meta, products: res.results };
  }

  @CacheKey('SingleProduct')
  @CacheTTL(20)
  @Get('/find')
  public async getSingleProduct(@Query('id') id: string) {
    const product = await this.productsService.findById(id);
    if (!product) {
      throw new HttpException('Product not found with id: ' + id, 404);
    }
    return { product };
  }

  @CacheKey('SimilarProducts')
  @CacheTTL(20)
  @Get('/similar')
  public async getSimilarProducts(@Query('id') id: string) {
    const products = await this.productsService.findSimilarProducts(id);
    return { products };
  }
}
