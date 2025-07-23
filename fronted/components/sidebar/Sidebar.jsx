"use client";

import { useState, useEffect } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarSearch from "./SidebarSearch";
import ChatList from "./ChatList";
import UserProfile from "./UserProfile";
import MobileToggle from "./MobileToggle";
import { useRouter } from "next/navigation";
import { fetchChats, markMessagesRead } from "@/utils/apiHelpers";
import socket from "@/utils/socket";

export default function Sidebar({ currentUser, setSelectedChat, selectedChat }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!currentUser?._id) return;
    socket.emit("join-user", currentUser._id);
    loadChats();
  }, [currentUser]);

  const loadChats = async () => {
    const data = await fetchChats(currentUser._id);
    if (data) setChats(data);
  };

  const handleChatClick = async (chat) => {
    setSelectedChat(chat);
    await markMessagesRead(chat._id, currentUser._id);
    loadChats();
    setIsOpen(false);
  };

  const filteredChats = chats.filter((chat) => {
    const name = chat.isGroup
      ? chat.name
      : chat.members.filter((u) => u._id !== currentUser._id).map((u) => u.name).join(", ");
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
  <>
    {/* Mobile toggle button (hamburger icon when closed) */}
    {isMobile && !isOpen && <MobileToggle setIsOpen={setIsOpen} />}

    {/* Sidebar container */}
    <div
      className={`
        fixed md:relative top-0 left-0 h-full bg-gray-900 text-white z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
        md:w-[280px] md:translate-x-0
      `}
    >
      <div className="flex flex-col h-full overflow-hidden">
        <SidebarHeader isMobile={isMobile} setIsOpen={setIsOpen} />
        <SidebarSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          router={router}
        />
        <ChatList
          chats={filteredChats}
          currentUser={currentUser}
          selectedChat={selectedChat}
          onChatClick={handleChatClick}
        />
        <UserProfile currentUser={currentUser} />
      </div>
    </div>
  </>
);

}
