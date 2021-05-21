import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductsService } from 'src/modules/products/products.service';
import { CartController } from './cart.controller';
import { CartMiddleware } from './cart.middleware';

@Module({
  imports: [ProductsService],
  controllers: [CartController],
  providers: [ProductsService],
})
export class CartModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CartMiddleware).forRoutes(CartController);
  }
}
