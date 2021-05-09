import { Router } from 'express';
import { auth } from '../middlewares';
import {
  commentOnAPost,
  createPost,
  deleteCommentOnPost,
  deletePostById,
  dislikeAPost,
  editCommentOnPost,
  getAllPosts,
  getCommentOfAPost,
  getCommentsOfAPost,
  getLikesOfAPost,
  getPostById,
  getUserPosts,
  likeAPost,
} from '../controllers';

export const router = Router();

router.get('/', auth, getAllPosts);
router.get('/:postId', auth, getPostById);
router.post('/', auth, createPost);
router.delete('/:postId', auth, deletePostById);

router.get('/user/:username', auth, getUserPosts);

router.get('/likes/:postId', auth, getLikesOfAPost);
router.post('/like/:postId', auth, likeAPost);
router.delete('/dislike/:postId', auth, dislikeAPost);

router.get('/comments/:postId', auth, getCommentsOfAPost);
router.get('/comment/:postId/:commentId', auth, getCommentOfAPost);
router.post('/comment/:postId', auth, commentOnAPost);
router.delete('/comment/:postId/:commentId', auth, deleteCommentOnPost);
router.put('/comment/:postId/:commentId', auth, editCommentOnPost);
