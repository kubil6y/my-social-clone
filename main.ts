import 'reflect-metadata';
require('dotenv').config({ path: './config.env' });
import express, { Request, Response } from 'express';
import next from 'next';
import { authRouter, registerRouter } from './server/routes';
import { NODE_ENV, __prod__, PORT, __dev__ } from './server/constants';
import { connectDb } from './server/utils';
import { trimBody } from './server/middlewares';

const dev = __dev__;
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
  try {
    await app.prepare();
    const server = express();
    await connectDb();

    server.use(express.json());
    server.use(trimBody);

    server.use('/api/auth', authRouter);
    server.use('/api/register', registerRouter);

    server.all('*', (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(PORT, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${PORT} - env ${NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
