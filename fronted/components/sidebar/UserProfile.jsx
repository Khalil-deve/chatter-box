import { useRouter } from "next/navigation";
import { FiUser, FiLogOut } from "react-icons/fi";

export default function UserProfile({ currentUser }) {
  const router = useRouter();
  function onLogout (){
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('user');
    router.push('/')
  }
  return (
    <div className="p-3 border-t border-gray-700">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
            {currentUser?.name ? (
              currentUser.name
                .split(" ")
                .slice(0, 2)
                .map((part) => part.charAt(0).toUpperCase())
                .join("")
            ) : (
              <FiUser />
            )}
          </div>
          <div>
            <h4 className="font-medium">{currentUser?.name}</h4>
            <p className="text-xs text-green-400">Online</p>
          </div>
        </div>
        
        {/* Logout button */}
        <button 
          onClick={onLogout}
          className="text-red-400 hover:text-red-700 transition-colors"
          title="Logout"
        >
          <FiLogOut size={18} />
        </button>
      </div>
    </div>
  );
}
