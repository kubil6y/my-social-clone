import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import { Request, Response } from 'express';
import { msg500, regexUserName, userPng } from '../utils';
import { Follower, Profile, User } from '../models';
import { IJwtPayload } from '../utils/types';
import { JWT_SECRET, __prod__ } from '../constants';

export const checkUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  let errors: any = {};
  try {
    if (username.length < 2) {
      errors.username = 'Username must contain at least 2 characters';
    }

    if (!regexUserName.test(username)) {
      errors.username = 'Username is invalid';
    }

    // saving username as lowercase to the database
    const user = await User.findOne({ username: username.toString() });
    if (user) errors.username = 'Username is already taken';

    if (Object.values(errors).length > 0) {
      return res.status(400).json(errors);
    }

    return res.send('Available');
  } catch (error) {
    return msg500(error, res);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
    username,
    bio,
    facebook,
    youtube,
    twitter,
    instagram,
  } = req.body.user;
  const { profilePicUrl } = req.body;
  try {
    let errors: any = {};

    // VALIDATION
    if (username.length < 2) {
      errors.username = 'Username must contain at least 2 characters.';
    }

    if (!regexUserName.test(username)) {
      errors.username = 'Username is invalid.';
    }
    if (!isEmail(email)) errors.email = 'Email is not valid.';
    if (password.length < 6)
      errors.password = 'Password must be at least 6 characters.';

    const emailExists = await User.findOne({ email: email.toLowerCase() });
    if (emailExists) errors.email = 'Email is already taken.';

    const usernameExists = await User.findOne({
      username: username.toLowerCase(),
    });
    if (usernameExists) errors.username = 'Username is already taken.';

    if (Object.values(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const user = new User({
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      profilePicUrl: profilePicUrl || userPng,
    });

    await user.save();

    let social: any = {};
    if (facebook) social.facebook = facebook;
    if (twitter) social.twitter = twitter;
    if (instagram) social.instagram = instagram;
    if (youtube) social.youtube = youtube;

    const follower = new Follower({
      user: user._id,
      follower: [],
      following: [],
    });
    const profile = new Profile({
      user: user._id,
      bio,
      social,
    });

    await follower.save();
    await profile.save();

    // signing in user with register
    const payload: IJwtPayload = { userId: user._id };
    const token = jwt.sign(payload, JWT_SECRET);

    return res.json(token);
  } catch (error) {}
};
