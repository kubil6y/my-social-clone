import { Request, Response } from 'express';
import { User } from '../models';
import { msg500 } from '../utils';

export const searchUser = async (req: Request, res: Response) => {
  const { term } = req.params;
  try {
    if (term.length === 0) return res.status(400).send('Invalid Request');

    const userPattern = new RegExp(`^${term}`);

    const results = await User.find({
      name: { $regex: userPattern, $options: 'i' },
    });

    return res.json(results);
  } catch (error) {
    return msg500(error, res);
  }
};
