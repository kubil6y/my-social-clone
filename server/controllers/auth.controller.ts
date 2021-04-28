import isEmail from 'validator/lib/isEmail';
import { Request, Response } from 'express';
import { IUser, User } from '../models';
import { msg500 } from '../utils';
import { DocumentType } from '@typegoose/typegoose';

export const getUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      username: username.toLowerCase(),
    });
    if (!user) return res.status(400).send('User is not found');
    return res.json(user);
  } catch (error) {
    return msg500(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { credentials, password } = req.body;
    let user: DocumentType<IUser>;
    if (isEmail) {
      user = await User.findOne({ email: credentials.toLowerCase() });
    }
  } catch (error) {}
};
