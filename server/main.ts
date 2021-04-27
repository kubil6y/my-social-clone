require('dotenv').config();
import colors from 'colors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import { __prod__, PORT, publicDir } from './constants';
import { connectDb } from './utils';
import { trimBody } from './middlewares';

colors.enable();
const app = express();

app.use(express.static(publicDir));
app.use(express.json());
app.use(trimBody);
app.use(cookieParser());
if (!__prod__) app.use(morgan('dev'));

app.get('/', (_: Request, res: Response) => {
  res.send('hello');
});

app.listen(PORT, async () => {
  try {
    await connectDb();
    const msg = `[server] is running on http://localhost:${PORT}`.yellow.bold;
    console.log(msg);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
