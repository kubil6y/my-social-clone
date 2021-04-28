import { Router } from 'express';
import { getUser, login } from '../controllers';

export const router = Router();

router.get('/:username', getUser);
router.post('/', login);
