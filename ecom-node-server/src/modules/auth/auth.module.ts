import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './user.schema';
import { DatabaseModule } from '../database/database.module';
import { AuthMiddleware } from './auth.middleware';
import { JwtService } from './jwt.service';
import * as mongoose from 'mongoose';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    JwtService,
    AuthService,
    {
      provide: 'USER',
      inject: ['DATABASE'],
      useFactory: (connection: mongoose.Connection) => {
        return connection.model('users', UserSchema);
      },
    },
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        '/auth/user',
        '/auth/enable-2fa',
        '/auth/disable-2fa',
        '/auth/confirm-2fa',
      );
  }
}
