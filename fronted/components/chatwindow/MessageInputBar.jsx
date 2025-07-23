import { FiSend, FiImage, FiSmile } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";

export default function MessageInputBar({
  newMessage,
  setNewMessage,
  handleSendMessage,
  showEmojiPicker,
  setShowEmojiPicker,
  onEmojiClick,
  fileInputRef,
  handleImageSelect,
  imagePreview,
}) {
  return (
    <form
      onSubmit={handleSendMessage}
      className="border-t border-gray-200 dark:border-gray-700 p-3 relative"
    >
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-4 z-10">
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            width={300}
            height={350}
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="text-gray-500 dark:text-gray-400 hover:text-blue-500 p-2"
        >
          <FiImage />
        </button>

        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-gray-500 dark:text-gray-400 hover:text-blue-500 p-2"
        >
          <FiSmile />
        </button>

        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={!newMessage.trim() && !imagePreview}
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FiSend />
        </button>
      </div>
    </form>
  );
}