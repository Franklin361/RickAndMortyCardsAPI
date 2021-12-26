import { Router } from 'express';
import { check, param } from 'express-validator';
import { fieldsValidation } from '../middlewares/fieldsValidation';
import { 
    createCard, deleteCard
} from '../controllers/cardController';

import { validateJWT } from '../middlewares/validateJWT';

export const router = Router();

/* --------------------------------------------------------------------- */

router.post('/', [
    
    check('url', 'URL is required').notEmpty().isURL(),
    fieldsValidation,
    validateJWT

],  createCard);

/* --------------------------------------------------------------------- */

router.delete('/', [
    
    check('url', 'URL is required').notEmpty().isURL(),
    fieldsValidation,
    validateJWT

],  deleteCard );

/* --------------------------------------------------------------------- */
