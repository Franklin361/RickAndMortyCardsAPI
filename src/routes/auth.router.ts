import { Router } from 'express';
import { check } from 'express-validator';
import { fieldsValidation } from '../middlewares/fieldsValidation';

import { login } from '../controllers';

export const router = Router();

router.post('/', [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    fieldsValidation
], login)