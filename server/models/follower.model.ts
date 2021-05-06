import { IUser } from './user.model';
import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';

class _Follower {
  @prop({ ref: 'IUser' })
  public user?: Ref<IUser>;
}

class _Following {
  @prop({ ref: 'IUser' })
  public user?: Ref<IUser>;
}

@modelOptions({
  schemaOptions: {
    collection: 'followers',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
})
export class IFollower {
  @prop({ ref: 'IUser' })
  public user?: Ref<IUser>;

  @prop({ type: _Follower, _id: false })
  public followers?: _Follower[];

  @prop({ type: _Following, _id: false })
  public following?: _Following[];
}

export const Follower = getModelForClass(IFollower);
