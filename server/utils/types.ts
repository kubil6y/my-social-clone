import mongoose from 'mongoose';

export interface IJwtPayload {
  userId: mongoose.Schema.Types.ObjectId;
}
