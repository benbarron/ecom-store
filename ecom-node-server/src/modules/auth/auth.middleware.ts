import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-auth-token'] as string;
    if (!token) {
      throw new HttpException('Unauthorized', 401);
    }
    try {
      const decoded = jwt.verify(token, this.config.get('jwt.secret'));
      //@ts-ignore
      req.user = decoded;
      next();
    } catch (err) {
      throw new HttpException('Invalid token', 401);
    }
  }
}
