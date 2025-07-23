import axios from "axios";

const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const fetchChats = async (userId) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/chats?userId=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch chats", err);
    return null;
  }
};

export const markMessagesRead = async (chatId, userId) => {
  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/messages/mark-read/${chatId}`,
      { userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.error("Failed to mark messages read", err);
  }
};
