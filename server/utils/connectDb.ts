import mongoose from 'mongoose';
import { MONGO_URI } from '../constants';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI, options);
    const msg = '[database] MongoDB connected';
    console.log(msg);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
