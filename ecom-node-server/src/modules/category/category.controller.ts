import { Controller, Get, Query } from '@nestjs/common';
import CategoryService from './category.service';

@Controller('/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/search')
  public async searchCategories(@Query('q') q: string) {
    const categories = await this.categoryService.search(q, 1, 10);
    return { categories };
  }
  @Get('/suggestions')
  public async categorySearchSuggestions(@Query('q') q: string) {
    const suggestions = await this.categoryService.suggestions(q);
    return { suggestions };
  }
}
