import mongoose, { Schema, Document } from 'mongoose';

interface _Follower {
  user: mongoose.Types.ObjectId;
}

interface _Following {
  user: mongoose.Types.ObjectId;
}

export interface IFollower extends Document {
  user: mongoose.Types.ObjectId;
  followers: _Follower[];
  following: _Following[];
}

const FollowerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  followers: [{ user: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ user: Schema.Types.ObjectId, ref: 'User' }],
});

export const Follower = mongoose.model<IFollower>('Follower', FollowerSchema);
