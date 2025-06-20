import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";

const UserCards = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-sm w-full mt-30 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-2xl mx-auto">
      <img
        className="h-60 w-full object-cover"
        src={photoUrl}
        alt={`${firstName}'s profile`}
      />
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {age} years old, {gender}
          </p>
        )}
        {about && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {about}
          </p>
        )}
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 text-sm font-medium rounded-md border border-red-500 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="px-4 py-2 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-500 transition"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCards;
