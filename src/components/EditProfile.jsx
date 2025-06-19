import React, { useState } from "react";
import UserCards from "./UserCards";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      setError(error?.response?.data || "Profile update failed.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-6 py-12 ">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Form Section */}
          <div>
            <h1 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-white">
              Update Profile
            </h1>

            <div className="space-y-6">
              {[
                { label: "First Name", value: firstName, setter: setFirstName },
                { label: "Last Name", value: lastName, setter: setLastName },
                { label: "Age", value: age, setter: setAge },
                { label: "Gender", value: gender, setter: setGender },
                { label: "Photo URL", value: photoUrl, setter: setPhotoUrl },
                { label: "About", value: about, setter: setAbout },
              ].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                onClick={saveProfile}
                className="mt-4 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-all"
              >
                Save Profile
              </button>
            </div>
          </div>

          {/* Live Profile Preview */}
          <div className="mt-10 md:mt-0">
            <h2 className="text-xl font-semibold mb-4 ml-15 text-gray-900 dark:text-white">
              Live Preview
            </h2>
            {/* <UserCards
              user={{ firstName, lastName, photoUrl, age, gender, about }}
            /> */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto">
              <div className="flex items-center space-x-4">
                <img
                  src={photoUrl || "https://via.placeholder.com/100"}
                  alt="Profile"
                  className="w-20 h-20 object-cover rounded-full border-2 border-gray-300 dark:border-gray-600"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {firstName} {lastName}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300">
                    {gender || "Not specified"} •{" "}
                    {age ? `${age} years old` : "Age not set"}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  About
                </h4>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  {about || "No bio provided yet."}
                </p>
              </div>

              <div className="absolute top-4 right-4 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 text-xs font-semibold rounded-full">
                Preview
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Message */}
      {showToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md animate-toast">
            Profile updated!
          </div>
        </div>
      )}

      {/* Toast animation */}
      <style>
        {`
          @keyframes toast {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-toast {
            animation: toast 0.3s ease-out;
          }
        `}
      </style>
    </>
  );
};

export default EditProfile;
