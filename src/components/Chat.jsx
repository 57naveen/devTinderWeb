import React, { useEffect, useState } from "react";
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

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + toTargetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  });

  //As soon as the page loaded, the socket connectio is made and joinChat event is emitted
  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, toTargetUserId });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " : " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    // when the component is unmounted then disconnect the socket
    return () => {
      socket.disconnect();
    };
  }, [userId, toTargetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      toTargetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div
      className="flex flex-col max-w-2xl mx-auto bg-base-200 p-4 rounded-lg shadow-lg mt-8"
      style={{ height: "600px" }}
    >
      <h2 className="text-2xl font-bold mb-6">Chat with {toTargetUserId}</h2>

      {/* Scrollable Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${
              user.firstName === msg.firstName ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-header text-sm font-semibold mb-1">
              {`${msg.firstName} ${msg.lastName}`}
              <time className="text-xs ml-2 opacity-50">{msg.time}</time>
            </div>
            <div
              className={`chat-bubble ${
                user.firstName === msg.firstName
                  ? "bg-accent text-white"
                  : "bg-amber-400 text-black"
              }`}
            >
              {msg.text}
            </div>
            <div className="chat-footer text-xs opacity-50">
              {msg.seen ? "Seen" : "Delivered"}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-accent" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
