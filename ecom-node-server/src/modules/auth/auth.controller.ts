import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto } from './auth.dto';
import { User } from './user.interface';
import * as speakeasy from 'speakeasy';
import * as bcrypt from 'bcryptjs';
import { JwtService } from './jwt.service';

@Controller('/auth')
export class AuthController {
  constructor(
    @Inject('USER') private user: Model<User>,
    private readonly jwt: JwtService
  ) {}

  @Get('/user')
  public async getAuthenticatedUser(@Req() req: any) {
    const user = await this.user.findById(req.user._id);
    return { user };
  }

  @Post('/register')
  public async registerUser(@Body() body: RegisterDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(body.password, salt);
      const user = await this.user.create({
        username: body.username,
        email: body.email,
        password: hash,
        tfa: {
          secret: null,
          enabled: false,
        },
      });
      const token = this.jwt.sign({ 
        _id: user._id, 
        username: user.username,
        email: user.email
      });
      return { user, token };
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }

  @Post('/login')
  public async loginUser(@Body() body: LoginDto) {
    const user = await this.user.findOne({
      username: body.username,
    });
    if (!user) {
      throw new HttpException('Invalid credentials.', 400);
    }
    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new HttpException('Invalid credentials.', 400);
    }
    if (!user.tfa.enabled) {
      const token = this.jwt.sign({ 
        _id: user._id, 
        username: user.username,
        email: user.email
      });
      return { user, token };
    } else {
      return { user, token: null };
    }
  }

  @Put('/enable-2fa')
  public async enable2FA(@Req() req: any) {
    const secret = speakeasy.generateSecret();
    const user = await this.user.findOne({ _id: req.user._id });
    Object.assign(user, {
      tfa: {
        secret: {
          ascii: secret.ascii,
          hex: secret.hex,
          base32: secret.base32,
          otpauth_url: secret.otpauth_url,
        },
      },
    });
    await user.save();
    return { user };
  }

  @Put('/disable-2fa')
  public async disable2FA(@Req() request: any) {
    const user = await this.user.findOne({ _id: request.user._id });
    Object.assign(user, {
      tfa: {
        secret: null,
        enabled: false,
      },
    });
    await user.save();
    return { user };
  }

  @Put('/confirm-2fa')
  public async confirmF2A(@Query() query: any, @Req() request: any) {
    const user = await this.user.findById(request.user._id);
    const valid = speakeasy.totp.verify({
      secret: user.tfa.secret.base32,
      encoding: 'base32',
      token: query.token,
    });
    if (valid) {
      Object.assign(user, {
        f2a: { enabled: true, secret: user.tfa.secret },
      });
      await user.save();
    }
    return { success: valid };
  }

  @Put('/verify-2fa')
  public async verifyF2A(@Query() query: any) {
    const user = await this.user.findById(query.uid);
    const valid = speakeasy.totp.verify({
      secret: user.tfa.secret.base32,
      encoding: 'base32',
      token: query.token,
    });
    if (valid) {
      const token = this.jwt.sign({ 
        _id: user._id, 
        username: user.username,
        email: user.email
      });
      return { user, token };
    }
    throw new HttpException('Invalid token', 400);
  }
}
