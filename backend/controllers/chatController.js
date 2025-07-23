import Chat from '../models/Chat.js';
import Message from '../models/Message.js';


// Get all chats for the current user
export const chat = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) return res.status(400).json({ message: 'User ID is required' });

  try {
    const chats = await Chat.find({ members: userId })
      .populate('members', 'name avatar isOnline')
      .sort({ updatedAt: -1 });

    const chatsWithMeta = await Promise.all(
      chats.map(async (chat) => {
        const lastMessage = await Message.findOne({ chatId: chat._id })
          .sort({ createdAt: -1 })
          .lean();

        const unreadCount = await Message.countDocuments({
          chatId: chat._id,
          readBy: { $ne: userId },
          senderId: { $ne: userId }, // don't count user's own messages
        });

        return {
          ...chat.toObject(),
          lastMessage: lastMessage || null,
          unreadCount,
        };
      })
    );

    res.json(chatsWithMeta);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const createChat = async (req, res) => {
  const { name, members, isGroup } = req.body;
  const currentUserId = req.user._id; // Make sure you're using auth middleware to get this

  try {
    // 🟡 One-to-One Chat
    if (!isGroup) {
      if (!Array.isArray(members) || members.length !== 1) {
        return res.status(400).json({ message: "One-to-one chat requires exactly one member" });
      }

      const otherUserId = members[0];

      // 🔍 Check if a one-to-one chat already exists
      const existingChat = await Chat.findOne({
        isGroup: false,
        members: { $all: [currentUserId, otherUserId], $size: 2 },
      });

      if (existingChat) {
        return res.status(200).json(existingChat);
      }

      // ✅ Create new one-to-one chat
      const chat = new Chat({
        isGroup: false,
        members: [currentUserId, otherUserId],
      });

      await chat.save();
      return res.status(201).json(chat);
    }

    // 🟢 Group Chat
    if (!Array.isArray(members) || members.length < 2) {
      return res.status(400).json({ message: "Group requires at least 2 members" });
    }

    const chat = new Chat({
      name: name?.trim() || "Untitled Group",
      isGroup: true,
      members: [currentUserId, ...members], // include the creator
    });

    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    console.error("Chat creation failed:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
