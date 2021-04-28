import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { msg401, msg500 } from '../utils';
import { JWT_SECRET } from '../constants';
import { User } from '../models';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return msg401(res);
    }

    const { userId }: any = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({ _id: userId });
    if (!user) return msg401(res);

    req.user = user;

    return next();
  } catch (error) {
    return msg500(error, res);
  }
};
