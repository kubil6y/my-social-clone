import { Router } from 'express';
import { searchUser } from '../controllers';
import { auth } from '../middlewares';

export const router = Router();

router.get('/:term', auth, searchUser);
