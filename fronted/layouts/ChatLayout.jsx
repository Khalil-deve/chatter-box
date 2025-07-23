"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ChatWindow from "../components/chatwindow/ChatWindow";
import { useRouter } from "next/navigation";

export default function ChatLayout() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsClient(true);

    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("tokenExpiry");
    const isExpired = expiry && Date.now() > parseInt(expiry);

    if (!token || isExpired) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("user");
      router.push("/");
      return;
    }

    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (parsedUser) {
      setCurrentUser({
        _id: parsedUser._id,
        name: parsedUser.name,
      });
    }
  }, []);

  // Avoid rendering until on client
  if (!isClient) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {currentUser && (
        <div className="md:w-[300px] bg-gray-900 text-white">
          <Sidebar
            currentUser={currentUser}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        </div>
      )}

      {/* ChatWindow */}
      <div className="flex-1 h-full bg-white dark:bg-gray-900">
        <ChatWindow currentUser={currentUser} selectedChat={selectedChat} />
      </div>
    </div>
  );
}
