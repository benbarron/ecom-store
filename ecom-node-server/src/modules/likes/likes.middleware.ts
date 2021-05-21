// @ts-nocheck
import { Injectable, NestMiddleware, Next, Session } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Likes } from './likes';

@Injectable()
export class LikesMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.session.likes) {
      req.session.likes = new Likes();
    } else {
      const likes = new Likes();
      likes.setItems(req.session.likes.items);
      req.session.likes = likes;
    }
    next();
  }
}
