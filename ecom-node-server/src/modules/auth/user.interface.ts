import { Document } from 'mongoose';

export interface Secret {
  ascii: string;
  hex: string;
  base32: string;
  otpauth_url: string;
}

export interface TwoFactorAuth {
  secret: Secret | null;
  enabled: boolean;
}

export interface User extends Document {
  email: string;
  username: string;
  password: string;
  tfa: TwoFactorAuth;
}
