import { Router } from 'express';
import { check } from 'express-validator';
import { fieldsValidation } from '../middlewares/fieldsValidation';

import { login, signUp, renewToken } from '../controllers';
import { validateJWT } from '../middlewares/validateJWT';

export const router = Router();

router.post('/login', [
    
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    fieldsValidation

], login );

/* --------------------------------------------------------------------- */

router.post('/signup', [
    
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    check('email', 'Email no is valid').notEmpty().isEmail(),
    fieldsValidation

], signUp );

/* --------------------------------------------------------------------- */

router.get('/renew', [
    
    validateJWT

],renewToken)
