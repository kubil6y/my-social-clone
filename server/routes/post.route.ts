import { Router } from 'express';
import { auth } from '../middlewares';
import {
  commentOnAPost,
  createPost,
  deletePostById,
  dislikeAPost,
  getAllPosts,
  getCommentsOfAPost,
  getLikesOfAPost,
  getPostById,
  likeAPost,
} from '../controllers';

export const router = Router();

router.get('/', auth, getAllPosts);
router.get('/:postId', auth, getPostById);
router.post('/', auth, createPost);
router.delete('/:postId', auth, deletePostById);

router.get('/likes/:postId', auth, getLikesOfAPost);
router.post('/like/:postId', auth, likeAPost);
router.delete('/dislike/:postId', auth, dislikeAPost);

router.post('/comment/:postId', auth, commentOnAPost);
router.get('/comments/:postId', auth, getCommentsOfAPost);
