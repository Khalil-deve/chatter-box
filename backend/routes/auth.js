import express from 'express';
import { login, signup } from '../controllers/authController.js';
import validateUser from '../middlewares/AuthMiddlewares/validateUser.js';
import validateLogin from '../middlewares/AuthMiddlewares/validateLogin.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;

