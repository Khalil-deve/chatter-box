import express from 'express';
const router = express.Router();
import { getAllUser } from '../controllers/userController.js';

router.get('/', getAllUser);


export default router;