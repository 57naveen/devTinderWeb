import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import chat from "/image/chat.png";

const Connection = () => {
  const [connections, setConnections] = useState([]);

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnections(res?.data?.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections || connections.length === 0)
    return (
      <h1 className="flex justify-center my-20 text-2xl font-semibold text-gray-700 dark:text-white">
        No Connections Found
      </h1>
    );

  return (
    <div className="w-full flex justify-center my-12 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
          Your Connections
        </h1>

        <div className="space-y-6">
          {connections.map(({ _id, firstName, lastName, age, gender, about, photoUrl }) => (
            <div
              key={_id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg flex flex-col sm:flex-row items-center justify-between p-5 transition hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {firstName} {lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{age}, {gender}</p>
                  )}
                  {about && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{about}</p>
                  )}
                </div>
              </div>

              <Link to={`/chat/${_id}`} className="mt-4 sm:mt-0">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-md hover:bg-green-500 transition">
                  <img src={chat} alt="chat" className="w-5 h-5" />
                  Chat
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connection;
