import { Controller, Get, Query } from '@nestjs/common';
import StoreService from './stores.service';

@Controller('/stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('/search')
  public async search(
    @Query('q') q: string,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    const stores = await this.storeService.searchStores(q, page, size);
    return { stores };
  }
}
