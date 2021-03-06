import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ProductsController from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        ttl: config.get('cache.ttl'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
