import { FiUser } from "react-icons/fi";

export default function ChatList({ chats, currentUser, selectedChat, onChatClick }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <h3 className="px-4 py-2 text-sm font-semibold text-gray-400">Recent Chats</h3>
      <ul className="space-y-1 px-2">
        {chats.map((chat) => {
          const otherUsers = chat.members.filter((u) => u._id !== currentUser._id);
          const chatName = chat.isGroup
            ? chat.name
            : otherUsers.map((u) => u.name).join(", ");
          const lastMessage = chat.lastMessage?.content || "No messages yet";
          const unreadCount = chat.unreadCount || 0;

          return (
            <li
              key={chat._id}
              onClick={() => onChatClick(chat)}
              className={`
                flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors
                ${selectedChat?._id === chat._id ? "bg-gray-800" : ""}
              `}
            >
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                {chatName ? (
                  chatName
                    .split(" ")
                    .slice(0, 2)
                    .map((part) => part.charAt(0).toUpperCase())
                    .join("")
                ) : (
                  <FiUser />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium truncate">{chatName}</h4>
                </div>
                <p className="text-sm text-gray-400 truncate">{lastMessage}</p>
              </div>
              {unreadCount > 0 && selectedChat?._id !== chat._id && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}