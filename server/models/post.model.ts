import mongoose, { Schema, Document } from 'mongoose';

interface ILike {
  user: Schema.Types.ObjectId;
}

interface IComment {
  _id: string;
  user: Schema.Types.ObjectId;
  text: string;
  date: Date;
}

export interface IPost extends Document {
  user: Schema.Types.ObjectId;
  text: string;
  location?: string;
  picUrl?: string;
  likes: ILike[];
  comments: IComment[];
}

const PostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    location: { type: String },
    picUrl: { type: String },
    likes: [{ user: { type: Schema.Types.ObjectId, ref: 'User' } }],
    comments: [
      {
        _id: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model<IPost>('Post', PostSchema);
