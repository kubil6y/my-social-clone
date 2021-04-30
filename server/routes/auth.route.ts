import { Router } from 'express';
import { getUser, login, getUserDetails } from '../controllers';
import { auth } from '../middlewares';

export const router = Router();

// TODO returns too much information
router.get('/:username', getUser);

router.post('/', login);
router.get('/', auth, getUserDetails);
