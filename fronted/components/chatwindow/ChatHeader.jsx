import { FiUser, FiMoreVertical } from "react-icons/fi";
import { BsCheck2All } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

export default function ChatHeader({ currentUser, selectedChat }) {
  const getChatTitle = () => {
    if (!selectedChat) return "Select a chat";
    if (selectedChat.isGroup) return selectedChat.name;
    const other = selectedChat.members?.find((m) => m._id !== currentUser._id);
    return other?.name || "Chat";
  };

  const getStatusText = () => {
    if (!selectedChat) return "";
    if (selectedChat.isGroup) return `${selectedChat.members?.length} members`;
    
    // Simulate last seen/online status
    const isOnline = Math.random() > 0.5; // Replace with real status logic
    return isOnline ? "Online" : "Last seen today at 12:45 PM";
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-3 flex items-center justify-between bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
            {selectedChat?.isGroup ? (
              <span className="text-xs font-medium">
                {selectedChat.name
                  ?.split(" ")
                  .slice(0, 2)
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </span>
            ) : (
              currentUser?.name
                ?.split(" ")
                .slice(0, 2)
                .map((n) => n[0])
                .join("")
                .toUpperCase() || <FiUser />
            )}
          </div>
          {!selectedChat?.isGroup && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
          )}
        </div>
        
        <div>
          <h2 className="font-semibold text-gray-800 dark:text-white">
            {getChatTitle()}
          </h2>
          <p className={`text-xs ${
            getStatusText() === "Online" 
              ? "text-green-500" 
              : "text-gray-500 dark:text-gray-400"
          }`}>
            {getStatusText()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
        <button className="hover:text-gray-700 dark:hover:text-gray-200">
          <IoMdSend size={18} />
        </button>
        <button className="hover:text-gray-700 dark:hover:text-gray-200">
          <BsCheck2All size={18} />
        </button>
        <button className="hover:text-gray-700 dark:hover:text-gray-200">
          <FiMoreVertical size={18} />
        </button>
      </div>
    </div>
  );
}