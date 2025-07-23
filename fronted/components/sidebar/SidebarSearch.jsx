import { FiSearch, FiPlus } from "react-icons/fi";

export default function SidebarSearch({ searchTerm, setSearchTerm, router }) {
  return (
    <div className="p-3">
      <div className="relative">
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={() => router.push("/chatpage/create-group")}
        className="mt-2 w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <FiPlus />
        <span>New Group</span>
      </button>
    </div>
  );
}