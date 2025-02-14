import mongoose, { Schema, Document } from 'mongoose';
import { Message, MessageSchema } from './Message.model';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAcceptingMessage: boolean;
  messages: Message[];
}

export const UserSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: String,
      required: [true, 'Verify code is required'],
    },
    verifyCodeExpiry: {
      type: Date,
      required: [true, 'Verify code expiry is required'],
    },
    messages: [MessageSchema],
  },
  { timestamps: true },
);

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema);

export default UserModel;
