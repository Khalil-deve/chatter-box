import express from 'express';
const router = express.Router();
import { getMessage, createMessage, markMessagesAsRead} from '../controllers/messageController.js';
import { upload } from '../middlewares/UploadMiddlewares/cloudinaryConfig.js';
import verifyToken from "../middlewares/verifyToken.js";

// Get messages for a chat
router.get('/:chatId', getMessage);

//Creat Message
router.post('/', upload.single('file'), createMessage);

//Put message
router.put('/mark-read/:chatId', markMessagesAsRead)

export default router;