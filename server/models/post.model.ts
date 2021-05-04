import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { IUser } from './user.model';

class ILike {
  @prop({ type: () => IUser })
  public user?: Ref<IUser>;
}

@modelOptions({
  schemaOptions: {
    collection: 'posts',
    timestamps: true,
  },
})
class IComment {
  @prop({ ref: () => IUser })
  public user?: Ref<IUser>;

  @prop({ required: true })
  public text!: string;

  @prop({ default: new Date() })
  date?: Date;
}

export class IPost {
  @prop({ ref: () => IUser })
  public user?: Ref<IUser>;

  @prop({ required: true })
  public text!: string;

  @prop()
  public location?: string;

  @prop()
  public picUrl?: string;

  @prop({ type: () => ILike })
  public likes?: ILike[];

  @prop({ type: () => IComment })
  public comments?: IComment[];
}

export const Post = getModelForClass(IPost);
