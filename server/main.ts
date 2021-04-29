import 'reflect-metadata';
require('dotenv').config();
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import { __prod__, PORT, publicDir, ORIGIN } from './constants';
import { connectDb } from './utils';
import { trimBody } from './middlewares';
import { authRouter, registerRouter } from './routes';

colors.enable();
const app = express();

// MIDDLEWARES
app.use(express.static(publicDir));
app.use(express.json());
app.use(cookieParser());
app.use(trimBody);
if (!__prod__) app.use(morgan('dev'));
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// ROUTES
app.use('/api/auth', authRouter);
app.use('/api/register', registerRouter);

const aloRouter = express.Router();
aloRouter.post('/', (req, res) => {
  res.send(req.body);
});
app.use('/api/alo', aloRouter);

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
