import express from 'express';
const router = express.Router();
import { chat, createChat} from '../controllers/chatController.js';
import verifyToken from "../middlewares/verifyToken.js";


router.get('/',verifyToken, chat);

router.post('/',verifyToken, createChat);

export default router;