import { Router } from 'express';
import { checkUsername, registerUser } from '../controllers';

export const router = Router();

router.get('/:username', checkUsername);
router.post('/', registerUser);
