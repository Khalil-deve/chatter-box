"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ChatWindow from "../components/chatwindow/ChatWindow";
import { useRouter } from "next/navigation";

export default function ChatLayout() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  
  const router = useRouter();
  const isAuthenticated = localStorage.getItem("token");
  const expiry = localStorage.getItem("tokenExpiry");
  const isExpired = expiry && Date.now() > parseInt(expiry);
  // Check if the user is authenticated
  if (!isAuthenticated || isExpired) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem('user');
    router.push("/");
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    if (parsedUser) {
      setCurrentUser({
        _id: parsedUser._id,
        name: parsedUser.name,
      });
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - fixed width or 25% */}
      {currentUser && (
        <div className="md:w-[300px] bg-gray-900 text-white">
          <Sidebar
            currentUser={currentUser}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        </div>
      )}

      {/* ChatWindow - fills remaining space */}
      <div className="flex-1 h-full bg-white dark:bg-gray-900">
        <ChatWindow currentUser={currentUser} selectedChat={selectedChat} />
      </div>
    </div>
  );
}
