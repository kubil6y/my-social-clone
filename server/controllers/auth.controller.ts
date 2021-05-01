import isEmail from 'validator/lib/isEmail';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IJwtPayload, msg500 } from '../utils';
import { JWT_SECRET, __prod__ } from '../constants';
import { Follower, User } from '../models';

export const getUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      username: username.toLowerCase(),
    });
    if (!user) return res.status(400).send('User is not found.');
    return res.json(user);
  } catch (error) {
    return msg500(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  const { credentials, password } = req.body;
  let errors: any = {};
  try {
    let user: any = undefined;

    if (isEmail(credentials)) {
      user = await User.findOne({ email: credentials.toLowerCase() }).select(
        '+password'
      );
    } else {
      user = await User.findOne({ username: credentials.toLowerCase() }).select(
        '+password'
      );
    }

    if (!user)
      return res.status(404).json({ credentials: 'Invalid Credentials.' });

    const isPwValid = await argon2.verify(user.password, password);
    if (!isPwValid) errors.password = 'Invalid password.';

    if (Object.values(errors).length > 0) {
      return res.status(401).json(errors);
    }

    // issue token here
    const payload: IJwtPayload = { userId: user._id };
    const token = jwt.sign(payload, JWT_SECRET);

    return res.json(token);
  } catch (error) {
    return msg500(error, res);
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    const userFollowStats = await Follower.findOne({
      user: user._id,
    });

    return res.json({ user, userFollowStats });
  } catch (error) {
    return msg500(error, res);
  }
};
