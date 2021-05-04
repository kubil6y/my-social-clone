import mongoose, { Schema, Document } from 'mongoose';

interface ISocial {
  facebook?: string;
  twitter?: string;
  youtube?: string;
  instagram?: string;
}

export interface IProfile extends Document {
  user: Schema.Types.ObjectId;
  bio: string;
  social: ISocial;
}

const ProfileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    bio: { type: String, required: true },
    social: {
      facebook: { type: String },
      twitter: { type: String },
      youtube: { type: String },
      instagram: { type: String },
    },
  },
  { timestamps: true }
);

export const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);
