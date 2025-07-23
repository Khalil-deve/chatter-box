export default function ChatMessages({ messages, currentUser, messagesEndRef, setZoomImageUrl }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((message) => {
        const isMe =
          message.senderId === currentUser._id ||
          message.senderId?._id === currentUser._id;

        const time = new Date(
          message.createdAt || message.timestamp
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        return (
          <div
            key={message._id || message.timestamp}
            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[80%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] break-words ${
                isMe
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none"
              }`}
            >
              {message.type === "image" ? (
                <img
                  src={message.content}
                  alt="Sent"
                  className="rounded-md mb-1 max-w-full max-h-60 object-cover cursor-pointer"
                  onClick={() => setZoomImageUrl(message.content)}
                />
              ) : (
                <p>{message.content}</p>
              )}
              <p
                className={`text-xs mt-1 ${
                  isMe ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {time}
              </p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
