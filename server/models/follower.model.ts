import { IUser } from './user.model';
import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';

class _Follower {
  @prop({ ref: () => IUser })
  public user?: Ref<IUser>;
}

class _Following {
  @prop({ ref: () => IUser })
  public user?: Ref<IUser>;
}

@modelOptions({
  schemaOptions: {
    collection: 'followers',
    timestamps: true,
  },
})
export class IFollower {
  @prop({ ref: () => IUser })
  public user?: Ref<IUser>;

  @prop({ type: () => _Follower })
  public followers?: _Follower[];

  @prop({ type: () => _Following })
  public following?: _Following[];
}

export const Follower = getModelForClass(IFollower);
