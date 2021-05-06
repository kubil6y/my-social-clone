import { v4 as uuidv4 } from 'uuid';
import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { IUser } from './user.model';

class ILike {
  // like does not require uuid because,
  // a user can not like it multiple times.
  @prop({ ref: 'IUser' })
  public user?: Ref<IUser>;

  @prop({ default: () => new Date() })
  createdAt?: Date;
}

class IComment {
  // for more information (check notes)
  // for some reason i can not make this required!
  @prop({ default: () => uuidv4() })
  uuid?: string;

  @prop({ ref: 'IUser' })
  public user?: Ref<IUser>;

  @prop({ required: true })
  public text!: string;

  @prop({ default: () => new Date() })
  createdAt?: Date;

  @prop({ default: () => new Date() })
  updatedAt?: Date;
}

@modelOptions({
  schemaOptions: {
    collection: 'posts',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
})
export class IPost {
  @prop({ ref: 'IUser' })
  public user?: Ref<IUser>;

  @prop({ required: true })
  public text!: string;

  @prop()
  public location?: string;

  @prop()
  public picUrl?: string;

  // subdocument arrays need _id: false (from documentation to make them work easier i guess...)
  @prop({ type: ILike, _id: false })
  public likes?: ILike[];

  @prop({ type: IComment, _id: false })
  public comments?: IComment[];
}

export const Post = getModelForClass(IPost);
