import Chat from '../models/Chat.js';
import User from '../models/User.js';
import Message from '../models/Message.js';


export const getMessage = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chatId })
      .populate('senderId', 'name avatar')
      .sort({ createdAt: 1 }); // oldest first

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export const createMessage = async (req, res) => {
  try {
    const { chatId, senderId, content, type = 'text' } = req.body;

    if (!chatId || !senderId || (!content && !req.file)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    console.log("the request body is: ", req.body);
    console.log('Uploaded file details:', req.file);

    const message = new Message({
      chatId,
      senderId,
      content: type === 'image' ? req.file.path : content,
      type,
      readBy: [senderId],
    });

    await message.save();
    res.status(201).json(message);

  } catch (err) {
    console.error('Error in createMessage:', err); 
    return res.status(500).json({
      message: 'Failed to send message',
      error: err.message || err,
    });
  }
};



export const markMessagesAsRead = async (req, res) => {
  const { chatId } = req.params;
  const { userId } = req.body;

  if (!chatId || !userId) {
    return res.status(400).json({ message: 'Chat ID and User ID are required' });
  }

  try {
    await Message.updateMany(
      {
        chatId,
        readBy: { $ne: userId }, // Not already read
        senderId: { $ne: userId }, // Don’t mark own messages
      },
      { $addToSet: { readBy: userId } } // Prevent duplicates
    );

    res.json({ message: 'Messages marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark messages as read', error: err.message });
  }
};
