import { Response, Request } from 'express';
import { msg401, msg500 } from '../utils';
import { Post, User, Follower, IPost, UserRoles } from '../models';

export const createPost = async (req: Request, res: Response) => {
  const { text, location, picUrl } = req.body;
  const { user } = req;
  try {
    let errors: any = {};
    if (text.length < 1) errors.text = 'Text must be at least one character.';

    if (Object.values(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const newPost: any = {
      user: user._id,
      text,
    };

    if (location) newPost.location = location;
    if (picUrl) newPost.picUrl = picUrl;

    const post = new Post(newPost as IPost);
    await post.save();

    // TODO we will only send the _id of this post at the end.
    return res.json(post);
  } catch (error) {
    return msg500(error, res);
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: 'desc' })
      .populate('user')
      .populate('comments.user');

    return res.json(posts);
  } catch (error) {
    return msg500(error, res);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId)
      .populate('user')
      .populate('comments.user');

    if (!post) return res.status(404).send('Post not found.');

    return res.json(post);
  } catch (error) {
    return msg500(error, res);
  }
};

export const deletePostById = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { user } = req;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send('Post not found.');

    if (user.role === UserRoles.root || post.user === user._id) {
      await post.remove();
    } else {
      return msg401(res);
    }

    return res.send('Success');
  } catch (error) {
    return msg500(error, res);
  }
};
