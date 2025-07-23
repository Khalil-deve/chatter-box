export default function initializeSocket(io) {
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Join user-specific room
    socket.on("join-user", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    // Join a chat room
    socket.on("join-chat", (chatId) => {
      socket.join(chatId);
      console.log(`Socket ${socket.id} joined chat ${chatId}`);
    });

    // Send message (text or image)
    socket.on("send-message", (messageData) => {
      try {
        const { chatId, senderId, type, content } = messageData;

        // Broadcast message to room
        io.to(chatId).emit("receive-message", {
          ...messageData,
          timestamp: new Date(),
        });

        // Optional notification for others in the chat
        socket.to(chatId).emit("new-message-notification", {
          chatId,
          senderId,
          messagePreview: type === "text" ? content?.slice(0, 30) : "Image",
        });
      } catch (error) {
        console.error("Socket message error:", error);
        socket.emit("message-error", {
          error: "Failed to broadcast message",
        });
      }
    });
  });
}
