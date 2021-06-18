import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  
  constructor(
    private readonly config: ConfigService
  ) {}

  public sign(payload: any) {
    return jwt.sign(payload, this.config.get('jwt.secret'), {
      expiresIn: this.config.get('jwt.expiration'),
    });
  }

  public decode(token: string) {
    return jwt.verify(token, this.config.get('jwt.secret'));
  }
}