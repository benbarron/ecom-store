import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { Eureka } from 'eureka-js-client';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { LikesModule } from './likes/likes.module';
import { StoreModule } from './stores/stores.module';
import { SearchModule } from './search/search.module';
import { config } from 'src/config';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    SearchModule,
    CartModule,
    ProductsModule,
    CategoryModule,
    StoreModule,
    LikesModule,
    OrderModule,
    PaymentModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
})
export default class AppModule {
  private eureka: Eureka;
  private config: ConfigService;

  constructor(config: ConfigService) {
    this.config = config;
    this.eureka = new Eureka(config.get('eureka'));
  }

  // onApplicationBootstrap() {
  //   if (this.config.get('mode') !== 'development') {
  //     this.eureka.start();
  //   }
  // }

  // onApplicationShutdown() {
  //   if (this.config.get('mode') !== 'development') {
  //     this.eureka.stop();
  //   }
  // }
}
