import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductsService } from 'src/modules/products/products.service';
import { LikesController } from './likes.controller';
import { LikesMiddleware } from './likes.middleware';

@Module({
  imports: [ProductsService],
  controllers: [LikesController],
  providers: [ProductsService],
})
export class LikesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LikesMiddleware).forRoutes(LikesController);
  }
}
