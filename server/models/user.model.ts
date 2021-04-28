import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

export enum UserRoles {
  root = 'root',
  user = 'user',
}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})
export class IUser {
  @prop({ required: true })
  public name: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true, select: false })
  public password: string;

  @prop({ required: true, unique: true, trim: true })
  public username!: string;

  @prop()
  public profilePicUrl?: string;

  @prop({ default: false })
  public newMessagePopup?: boolean;

  @prop({ default: false })
  public unreadMessage?: boolean;

  @prop({ default: false })
  public unreadNotification?: boolean;

  @prop({ enum: UserRoles, default: UserRoles.user })
  public role?: UserRoles;

  @prop()
  public resetToken?: string;

  @prop()
  public expireToken?: Date;
}

export const User = getModelForClass(IUser);
