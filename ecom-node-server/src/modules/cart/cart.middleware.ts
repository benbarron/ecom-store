// @ts-nocheck
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Cart } from './cart';

@Injectable()
export class CartMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.session.cart) {
      req.session.cart = new Cart();
    } else {
      const cart = new Cart();
      cart.setSubtotal(req.session.cart.subTotal);
      cart.setTotal(req.session.cart.total);
      cart.setTax(req.session.cart.tax);
      cart.setProducts(req.session.cart.products);
      req.session.cart = cart;
    }
    next();
  }
}
