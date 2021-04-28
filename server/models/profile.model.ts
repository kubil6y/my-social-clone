import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { IUser } from './user.model';

export class ISocial {
  @prop()
  youtube?: string;

  @prop()
  twitter?: string;

  @prop()
  intagram?: string;

  @prop()
  facebook?: string;
}

@modelOptions({
  schemaOptions: {
    collection: 'profiles',
    timestamps: true,
  },
})
export class IProfile {
  @prop({ ref: () => IUser })
  user: Ref<IUser>;

  @prop({ required: true })
  bio: string;

  @prop({ type: () => ISocial })
  social: ISocial;
}

export const Profile = getModelForClass(IProfile);
