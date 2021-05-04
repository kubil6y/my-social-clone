import { Response, Request } from 'express';
import { msg401, msg500 } from '../utils';
import { Post, IPost } from '../models';
import { v4 as uuidv4 } from 'uuid';

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

export const getAllPosts = async (_: Request, res: Response) => {
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

    if (user.role === 'root' || post.user.toString() === user._id.toString()) {
      await post.remove();
    } else {
      return msg401(res);
    }

    return res.send('Deleted Successfully');
  } catch (error) {
    return msg500(error, res);
  }
};

export const likeAPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { user } = req;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send('Post not found.');

    console.log({ likes: post.likes });
    const hasLiked = post.likes.find(
      (like) => like.user.toString() === user._id.toString()
    );
    if (hasLiked) {
      return res.status(400).send('You have already liked the post.');
    }

    post.likes.unshift({ user: user._id });
    await post.save();
    return res.send('Liked Successfully');
  } catch (error) {
    return msg500(error, res);
  }
};

export const dislikeAPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { user } = req;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send('Post not found.');

    const hasLiked = post.likes.find(
      (like) => like.user.toString() === user._id.toString()
    );
    if (hasLiked) {
      const newLikes = post.likes.filter(
        (like) => like.user.toString() !== user._id.toString()
      );
      post.likes = newLikes;
      await post.save();
      return res.send('Disliked Successfully');
    }
    return res.status(400).send('You have not liked the post before.');
  } catch (error) {
    return msg500(error, res);
  }
};

export const getLikesOfAPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId).populate('likes');
    if (!post) return res.status(404).send('Post not found.');

    return res.json(post.likes);
  } catch (error) {
    return msg500(error, res);
  }
};

export const commentOnAPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { user } = req;
  const { text } = req.body;
  try {
    let errors: any = {};
    if (text.length < 1) {
      errors.text = 'Comment should be at least one character';
    }

    const post = await Post.findById(postId).populate('likes');
    if (!post) return res.status(404).send('Post not found.');

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const newComment = {
      _id: uuidv4(),
      user: user._id,
      text,
      date: new Date(),
    };

    post.comments.unshift(newComment);
    await post.save();
    return res.send('Comment Added');
  } catch (error) {
    return msg500(error, res);
  }
};
