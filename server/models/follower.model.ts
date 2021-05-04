import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { IUser } from './user.model';

@modelOptions({
  schemaOptions: {
    collection: 'followers',
    timestamps: true,
  },
})
export class IFollower {
  @prop({ ref: 'IUser' })
  user!: Ref<IUser>;

  @prop({ ref: 'IUser' })
  follower!: Ref<IUser>[];

  @prop({ ref: 'IUser' })
  following!: Ref<IUser>[];
}

export const Follower = getModelForClass(IFollower);
