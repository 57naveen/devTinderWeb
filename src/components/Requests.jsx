import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      setRequests(res?.data?.data);

      // console.log(requests)
    } catch (error) {
      console.error(error);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }   
      );

    // Remove the reviewed request from the state
    setRequests(prevRequests => prevRequests.filter(request => request._id !== _id));
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="flex justify-center my-10 text-bold text-2xl text-black">No Connections Requests found</h1>
    );

  return (
    <div className="text-center my-10 px-4">
  <h1 className="text-3xl font-bold mb-6 text-black">Connection Requests</h1>

  <div className="flex flex-col gap-6 max-w-3xl mx-auto">
    {requests.map((request) => {
      const { _id, firstName, lastName, age, gender, about, photoUrl } =
        request.fromUserId;

      return (
        <div
          key={_id}
          className="bg-base-200 rounded-lg shadow-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Left: Profile Picture */}
          <img
            className="w-20 h-20 rounded-full object-cover border-2 border-primary"
            src={photoUrl}
            alt="User"
          />

          {/* Middle: User Info */}
          <div className="text-left flex-1">
            <h2 className="text-xl font-semibold text-white">
              {firstName} {lastName}
            </h2>
            <p className="text-gray-300">{age && gender && `${age}, ${gender}`}</p>
            {about && <p className="text-gray-400 text-sm mt-1">{about}</p>}
          </div>

          {/* Right: Action Buttons */}
          <div className="flex gap-2">
            <button
              className="btn btn-error btn-sm md:btn-md"
              onClick={() => reviewRequest("rejected", request._id)}
            >
              Reject
            </button>
            <button
              className="btn btn-success btn-sm md:btn-md"
              onClick={() => reviewRequest("accepted", request._id)}
            >
              Accept
            </button>
          </div>
        </div>
      );
    })}
  </div>
</div>
  );
};

export default Requests;
