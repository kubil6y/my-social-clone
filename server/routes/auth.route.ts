import { Router } from 'express';
import { getUser, login } from '../controllers';

export const router = Router();

// TODO returns too much information
router.get('/:username', getUser);

router.post('/', login);
