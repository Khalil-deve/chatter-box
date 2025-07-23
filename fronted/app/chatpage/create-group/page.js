"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiCheckCircle } from "react-icons/fi";

export default function CreateChatPage() {
  const [chatType, setChatType] = useState("one-to-one");
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user");
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          const currentUser = JSON.parse(localStorage.getItem("user"));
          const currentUserId = currentUser?._id;

          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const filteredUsers = res.data.filter(
            (user) => user._id !== currentUserId
          );
          setUsers(filteredUsers);
        }
      } catch (err) {
        toast.error("Error loading users");
        console.error("Error loading users:", err);
      }
    };

    fetchUsers();
  }, []);

  const toggleUser = (userId) => {
    if (chatType === "one-to-one") {
      setSelectedUsers(selectedUsers[0] === userId ? [] : [userId]);
    } else {
      setSelectedUsers((prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId)
          : [...prev, userId]
      );
    }
  };

  const handleCreateChat = async () => {
    if (chatType === "group" && !groupName.trim()) {
      toast.info("Please enter a group name");
      return;
    }

    if (chatType === "group" && selectedUsers.length < 2) {
      toast.info("Group must have at least 2 members");
      return;
    }

    if (chatType === "one-to-one" && selectedUsers.length !== 1) {
      toast.info("Please select one user to chat with");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/chats`,
        {
          name: chatType === "group" ? groupName : undefined,
          isGroup: chatType === "group",
          members: selectedUsers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/chatpage");
    } catch (err) {
      console.error("Failed to create chat:", err);
      toast.error(err.response?.data?.message || "Error creating chat");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-500 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-gray-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex flex-col space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-700">
                {chatType === "group" ? "Create New Group" : "Start New Chat"}
              </h1>
              <p className="mt-2 text-gray-600">
                {chatType === "group"
                  ? "Create a group with multiple members"
                  : "Start a private conversation"}
              </p>
            </div>

            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                  chatType === "one-to-one"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setChatType("one-to-one")}
              >
                One-to-One
              </button>
              <button
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                  chatType === "group"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setChatType("group")}
              >
                Group
              </button>
            </div>

            {chatType === "group" && (
              <div>
                <label
                  htmlFor="groupName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Group Name
                </label>
                <input
                  id="groupName"
                  type="text"
                  placeholder="Enter group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {chatType === "group" ? "Select Members" : "Select User"}
                <span className="ml-1 text-xs text-gray-500">
                  ({selectedUsers.length}{" "}
                  {chatType === "group" ? "selected" : ""})
                </span>
              </label>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 w-full px-4 text-gray-700 py-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div className="max-h-72 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-200">
                {users.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    Loading users...
                  </div>
                ) : (
                  users.map((user) => (
                    <div
                      key={user._id}
                      onClick={() => toggleUser(user._id)}
                      className={`flex items-center p-3 cursor-pointer transition-colors ${
                        selectedUsers.includes(user._id)
                          ? "bg-blue-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {chatType === "group" && (
                        <div className="flex items-center h-5 mr-3">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user._id)}
                            onChange={() => {}}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                      )}
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          @{user.username || user.name.toLowerCase()}
                        </p>
                      </div>
                      {chatType === "one-to-one" &&
                        selectedUsers.includes(user._id) && (
                          <div className="ml-auto">
                            <FiCheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                        )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-between space-x-4 pt-2">
              <button
                onClick={() => router.push("/chatpage")}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateChat}
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {chatType === "group"
                      ? "Creating Group..."
                      : "Starting Chat..."}
                  </span>
                ) : chatType === "group" ? (
                  "Create Group"
                ) : (
                  "Start Chat"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
