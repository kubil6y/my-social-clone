import { v4 as uuidv4 } from 'uuid';
import { Response, Request } from 'express';
import { msg401, msg500 } from '../utils';
import { Post, IPost, UserRole, User } from '../models';

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
      user,
      text,
    };

    if (location) newPost.location = location;
    if (picUrl) newPost.picUrl = picUrl;

    const post = new Post(newPost);
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
      .populate('user');

    // with twitter layout i only need, comment and like counts.
    //.populate('comments.user');

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

    const hasLiked = post.likes.find(
      (like) => like.user.toString() === user._id.toString()
    );
    if (hasLiked) {
      return res.status(400).send('You have already liked the post.');
    }

    // so it shows as the most recent (eventhough unshift is less optimal than push!)
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
    const post = await Post.findById(postId).populate('likes.user');
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

    const post = await Post.findById(postId).populate('likes.user');
    if (!post) return res.status(404).send('Post not found.');

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // TODO this might be an issue
    const newComment = {
      uuid: uuidv4(),
      user,
      text,
      date: new Date(),
    };

    post.comments.unshift(newComment);
    await post.save();
    return res.json(newComment);
  } catch (error) {
    return msg500(error, res);
  }
};

export const getCommentOfAPost = async (req: Request, res: Response) => {
  const { commentId, postId } = req.params;
  try {
    const post = await Post.findById(postId).populate('comments.user');
    if (!post) return res.status(404).send('Post not found.');

    const comment = post.comments.find((comment) => comment.uuid === commentId);
    if (!comment) return res.status(404).send('Comment not found.');

    return res.json(comment);
  } catch (error) {
    return msg500(error, res);
  }
};

export const getCommentsOfAPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId).populate('comments.user');
    if (!post) return res.status(404).send('Post not found.');

    return res.json(post.comments);
  } catch (error) {
    return msg500(error, res);
  }
};

export const deleteCommentOnPost = async (req: Request, res: Response) => {
  const { commentId, postId } = req.params;
  const { user } = req;
  try {
    const post = await Post.findById(postId).populate('comments.user');
    if (!post) return res.status(404).send('Post not found.');

    const comment = post.comments.find((comment) => comment.uuid === commentId);
    if (!comment) return res.status(404).send('Comment not found.');

    // @ts-ignore
    const isOwner = comment.user._id.toString() === user._id.toString();
    const hasAccess = isOwner || UserRole.root === user.role;
    if (!hasAccess) return msg401(res);

    const newComments = post.comments.filter(
      (comment) => comment.uuid !== commentId
    );
    post.comments = newComments;
    await post.save();
    return res.send('Comment Deleted');
  } catch (error) {
    return msg500(error, res);
  }
};

export const editCommentOnPost = async (req: Request, res: Response) => {
  const { commentId, postId } = req.params;
  const { user } = req;
  const { text } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send('Post not found.');

    const comment = post.comments.find((comment) => comment.uuid === commentId);
    if (!comment) return res.status(404).send('Comment not found.');

    const isOwner = comment.user.toString() === user._id.toString();
    const hasAccess = isOwner || UserRole.root === user.role;
    if (!hasAccess) return msg401(res);

    // replacing comment with new text
    const newComments = post.comments.map((comment) =>
      comment.uuid === commentId
        ? {
            uuid: comment.uuid,
            user: comment.user,
            createdAt: comment.createdAt,
            updatedAt: new Date(),
            text,
          }
        : comment
    );
    post.comments = newComments;
    await post.save();

    return res.send('Post Comment Edited');
  } catch (error) {
    return msg500(error, res);
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    console.log({ user });
    if (!user) return res.status(404).send('User does not exists');

    const posts = await Post.find({ user: user._id });
    return res.json(posts);
  } catch (error) {
    return msg500(error, res);
  }
};
