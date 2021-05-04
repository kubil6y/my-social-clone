import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { IUser } from './user.model';

export class IComment {
  @prop({ required: true })
  _id!: string;

  @prop({ ref: 'IUser' })
  user!: Ref<IUser>;

  @prop({ required: true })
  text!: string;

  @prop({ default: new Date() })
  date?: Date;
}

@modelOptions({
  schemaOptions: {
    collection: 'posts',
    timestamps: true,
  },
})
export class IPost {
  @prop({ ref: 'IUser' })
  user: Ref<IUser>;

  @prop({ required: true })
  text!: string;

  @prop()
  location?: string;

  @prop()
  picUrl?: string;

  @prop({ ref: 'IUser' })
  likes?: Ref<IUser>[];

  @prop({ type: () => IComment })
  comments?: Ref<IComment>[];
}

export const Post = getModelForClass(IPost);
