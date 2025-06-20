import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { toTargetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const chatEndRef = useRef(null);
  const socketRef = useRef(null);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${toTargetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          time: new Date(createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });

      setMessages(chatMessages);
    } catch (error) {
      console.error("Failed to load chat:", error.message);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [toTargetUserId]);

  useEffect(() => {
    if (!userId) return;

    socketRef.current = createSocketConnection();
    socketRef.current.emit("joinChat", { userId, toTargetUserId });

    socketRef.current.on("messageReceived", ({ firstName, lastName, text }) => {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((prev) => [...prev, { firstName, lastName, text, time }]);
    });

    return () => socketRef.current.disconnect();
  }, [userId, toTargetUserId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      toTargetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const oppositeUser = messages.find(
  (msg) => msg.firstName !== user?.firstName
);

  return (
   <div className="flex flex-col max-w-3xl w-full mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] mt-10 h-[80vh]">
  <h2 className="text-2xl font-bold mb-4 text-center">
    {oppositeUser ? `${oppositeUser.firstName} ${oppositeUser.lastName}` : "User"}
  </h2>

  {/* Messages Area */}
  <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`chat ${
          user.firstName === msg.firstName ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-header font-medium">
          {msg.firstName} {msg.lastName}
          <time className="text-xs opacity-60 ml-2">{msg.time}</time>
        </div>
        <div
          className={`chat-bubble ${
            user.firstName === msg.firstName
              ? "bg-blue-500 text-white"
              : "bg-yellow-400 text-black"
          }`}
        >
          {msg.text}
        </div>
        <div className="chat-footer opacity-50 text-xs">
          {user.firstName === msg.firstName ? "You" : "They"}
        </div>
      </div>
    ))}
    <div ref={chatEndRef}></div>
  </div>

  {/* Input Field */}
  <div className="flex items-center gap-2 mt-2">
    <input
      type="text"
      className="input input-bordered w-full bg-white text-black placeholder-gray-500"
      placeholder="Type your message..."
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    />
    <button
      className="btn h-11 rounded-lg bg-green-600 text-white hover:bg-green-500 disabled:opacity-50"
      onClick={sendMessage}
      disabled={!newMessage.trim()}
    >
      Send
    </button>
  </div>
</div>

  );
};

export default Chat;
