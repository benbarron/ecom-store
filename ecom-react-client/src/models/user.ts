export interface Secret {
  ascii: string;
  hex: string;
  base32: string;
  otpauth_url?: string;
}

export interface TwoFactor {
  secret: Secret;
  enabled: boolean;
}

export interface User {
  _id: string;
  username: string;
  password: string;
  f2a: TwoFactor;
}
