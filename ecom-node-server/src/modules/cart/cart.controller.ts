import { Controller, Delete, Get, Put, Query, Session } from '@nestjs/common';
import { ProductsService } from 'src/modules/products/products.service';
import { Cart } from './cart';

@Controller('/cart')
export class CartController {
  constructor(private readonly productService: ProductsService) {}

  @Get('')
  public async getCart(@Session() session: any) {
    return {
      msg: 'Fetched cart',
      cart: session.cart,
    };
  }

  @Put('/add')
  public async addToCart(@Query() query: any, @Session() session: any) {
    const product = await this.productService.findById(query.id);
    session.cart.addProduct(product);
    session.save();
    return {
      msg: 'Product added to cart',
      cart: session.cart,
    };
  }

  @Put('/update')
  public async updateQuantity(@Query() query: any, @Session() session: any) {
    session.cart.updateProductQuantity(query.id, Number(query.qty));
    session.save();
    return {
      msg: 'Product quantity updated',
      cart: session.cart,
    };
  }

  @Delete('')
  public async deleteItem(@Query() params: any, @Session() session: any) {
    session.cart.deleteProductFromCart(params.id);
    session.save();
    return {
      msg: 'Item deleted',
      cart: session.cart,
    };
  }

  @Delete('/all')
  public async deleteAllCartItems(@Session() session: any) {
    session.cart = new Cart();
    session.save();
    return {
      msg: 'Cart deleted',
      cart: session.cart,
    };
  }
}
