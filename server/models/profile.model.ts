import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { IUser } from './user.model';

class ISocial {
  @prop()
  public twitter?: string;

  @prop()
  public facebook?: string;

  @prop()
  public instagram?: string;

  @prop()
  public youtube?: string;
}

@modelOptions({
  schemaOptions: {
    collection: 'profiles',
    timestamps: true,
  },
})
export class IProfile {
  @prop({ ref: () => IUser })
  public user?: Ref<IUser>;

  @prop({ required: true })
  public bio!: string;

  @prop()
  public social: ISocial;
}

export const Profile = getModelForClass(IProfile);
