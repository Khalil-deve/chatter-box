import { FiMenu } from "react-icons/fi";

export default function MobileToggle({ setIsOpen }) {
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="absolute top-4 left-4 bg-gray-900 text-white p-2 rounded-lg shadow-lg z-20"
    >
      <FiMenu size={24} />
    </button>
  );
}
