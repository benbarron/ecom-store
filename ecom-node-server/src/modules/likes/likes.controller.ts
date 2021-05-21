import { Controller, Delete, Get, Post, Query, Session } from '@nestjs/common';
import { ProductsService } from 'src/modules/products/products.service';
import { Likes } from './likes';

@Controller('/likes')
export class LikesController {
  constructor(private readonly productService: ProductsService) {}

  @Get('')
  public getLikes(@Session() session: any) {
    return { likes: session.likes.items };
  }

  @Post('/add')
  public async addProduct(@Session() session: any, @Query() query: any) {
    const product = await this.productService.findById(query.id);
    session.likes.addItem(product);
    session.save();
    return { likes: session.likes.items };
  }

  @Delete('/remove')
  public async deleteProduct(@Session() session: any, @Query() query: any) {
    session.likes.removeItem(query.id);
    session.save();
    return { likes: session.likes.items };
  }

  @Delete('/destroy')
  public async deleteAllLikedItems(@Session() session: any) {
    session.likes = new Likes();
    session.save();
    return {
      msg: 'Liked items deleted',
      likes: session.likes.items,
    };
  }
}
