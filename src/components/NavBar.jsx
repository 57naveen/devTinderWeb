import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { FiUser, FiLogOut, FiUsers, FiUserCheck } from "react-icons/fi";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md w-full px-4 py-3 flex justify-between items-center">
      <Link to="/feed" className="text-2xl font-bold text-black dark:text-white">
        💘 Dev Tinder
      </Link>

      {user && (
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Welcome, <span className="font-semibold">{user.firstName}</span>
          </p>

          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
            >
              <div className="w-10 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-2">
                <img
                  src={user.photoUrl || "https://via.placeholder.com/150"}
                  alt="user"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white text-black  dark:bg-gray-800 rounded-box w-52"
            >
              <li className="hover:bg-gray-200">
                <Link to="/profile" className="flex items-center gap-2">
                  <FiUser /> Profile
                </Link>
              </li>
              <li className="hover:bg-gray-200">
                <Link to="/connections" className="flex items-center gap-2">
                  <FiUsers /> Connections
                </Link>
              </li>
              <li className="hover:bg-gray-200">
                <Link to="/requests" className="flex items-center gap-2">
                  <FiUserCheck /> Requests
                </Link>
              </li>
              <li >
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500"
                >
                  <FiLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
