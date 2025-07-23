"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import socket from "@/utils/socket";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ImageZoomModal from "./ImageZoomModal";
import ImagePreviewBar from "./ImagePreviewBar";
import MessageInputBar from "./MessageInputBar";

export default function ChatWindow({ currentUser, selectedChat }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [zoomImageUrl, setZoomImageUrl] = useState(null);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");

  // Load messages on chat change
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat?._id) return;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/messages/${selectedChat._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(res.data);

        socket.emit("join-chat", selectedChat._id);

        await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/messages/mark-read/${selectedChat._id}`,
          { userId: currentUser._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  // Send message handler
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !file) return;

    try {
      let messageData;

      if (file) {
        const formData = new FormData();
        formData.append("chatId", selectedChat._id);
        formData.append("senderId", currentUser._id);
        formData.append("type", "image");
        formData.append("file", file);

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/messages`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        messageData = res.data;
        setFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/messages`,
          {
            chatId: selectedChat._id,
            senderId: currentUser._id,
            content: newMessage,
            type: "text",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        messageData = res.data;
      }

      socket.emit("send-message", {
        ...messageData,
        timestamp: new Date(),
      });

      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    const handleReceiveMessage = (message) => {
      if (message.chatId === selectedChat?._id) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("receive-message", handleReceiveMessage);
    return () => socket.off("receive-message", handleReceiveMessage);
  }, [selectedChat]);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImageSelect = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selected);
    }
  };

  const onEmojiClick = (emojiData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-800 flex flex-col h-full overflow-hidden">
      <ChatHeader currentUser={currentUser} selectedChat={selectedChat} />
      <ChatMessages
        messages={messages}
        currentUser={currentUser}
        messagesEndRef={messagesEndRef}
        setZoomImageUrl={setZoomImageUrl}
      />
      <ImageZoomModal zoomImageUrl={zoomImageUrl} onClose={() => setZoomImageUrl(null)} />
      <ImagePreviewBar
        imagePreview={imagePreview}
        onRemove={() => {
          setImagePreview(null);
          setFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }}
      />
      {selectedChat && (
        <MessageInputBar
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          showEmojiPicker={showEmojiPicker}
          setShowEmojiPicker={setShowEmojiPicker}
          onEmojiClick={onEmojiClick}
          fileInputRef={fileInputRef}
          handleImageSelect={handleImageSelect}
          imagePreview={imagePreview}
        />
      )}
    </div>
  );
}
