//https://thecodebarbarian.com/working-with-mongoose-in-typescript.html
import argon2 from 'argon2';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  username: string;
  profilePicUrl?: string;
  newMessagePopup?: boolean;
  unreadMessage?: boolean;
  unreadNotification?: boolean;
  role?: string;
  resetToken?: string;
  expireToken?: Date;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true },
    profilePicUrl: { type: String },
    newMessagePopup: { type: Boolean, default: true },
    unreadMessage: { type: Boolean, default: false },
    unreadNotification: { type: Boolean, default: false },
    role: { type: String, default: 'user', enum: ['user', 'root'] },
    resetToken: { type: String },
    expireToken: { type: Date },
  },
  { timestamps: true }
);

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    this.password = await argon2.hash(this.password);
  }
  return next();
});

export const User = mongoose.model<IUser>('User', UserSchema);
