import argon2 from 'argon2';
import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
} from '@typegoose/typegoose';

export enum UserRole {
  user = 'user',
  root = 'root',
}

@pre<IUser>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await argon2.hash(this.password);
  }
  return next();
})
@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})
export class IUser {
  @prop({ required: true })
  public name!: string;

  @prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (email) => {
        const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegExp.test(email);
      },
      message: 'Email is invalid.',
    },
  })
  public email!: string;

  @prop({ required: true, select: false })
  public password!: string;

  @prop({ required: true, unique: true, trim: true, lowercase: true })
  public username!: string;

  @prop()
  public profilePicUrl?: string;

  @prop({ default: true })
  public newMessagePopup?: boolean;

  @prop({ default: false })
  public unreadMessage?: boolean;

  @prop({ default: false })
  public unreadNotification?: boolean;

  @prop({ enum: UserRole, default: UserRole.user })
  public role?: UserRole;

  @prop()
  public resetToken?: string;

  @prop()
  public expireToken?: Date;
}

export const User = getModelForClass(IUser);
