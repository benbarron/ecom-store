import { CacheModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CategoryController } from './category.controller';
import CategoryService from './category.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        ttl: config.get('cache.ttl'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
