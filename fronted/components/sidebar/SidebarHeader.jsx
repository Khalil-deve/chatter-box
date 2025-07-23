import { FiMessageSquare, FiX } from "react-icons/fi";

export default function SidebarHeader({ isMobile, setIsOpen }) {
  return (
    <div className="mt-3 p-4 border-b border-gray-700 flex items-center justify-between">
      <h2 className="text-xl font-bold flex items-center gap-2">
       <img src="/chatbox.png" alt="chatter box" />
        <span>Chatter Box</span>
      </h2>
      {isMobile && (
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white"
        >
          <FiX className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}