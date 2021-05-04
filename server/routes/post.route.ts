import { Router } from 'express';
import { auth } from '../middlewares';
import {
  createPost,
  deletePostById,
  getAllPosts,
  getPostById,
} from '../controllers';

export const router = Router();

router.get('/', auth, getAllPosts);
router.get('/:postId', auth, getPostById);
router.post('/', auth, createPost);
router.delete('/:postId', auth, deletePostById);
