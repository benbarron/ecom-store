import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email address is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
  },
  password: {
    type: String,
    unqiue: false,
    required: [true, 'Password is required']
  },
  tfa: {
    type: Object,
  },
});

// UserSchema.path('email').validate()
