import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Links, Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const Navigate = useNavigate();


  const handleLogout = async() =>{

    try {

      await axios.post(BASE_URL + "/logout", {}, {withCredentials:true})

      dispatch(removeUser());
      return Navigate("/login")
      
      
    } catch (error) {

      // console.error(error)
      
    }

  }

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">Dev Tinder</Link>
        </div>
        {user && (
        <div className="flex gap-2">
          <div className="form-control">Welcome, {user.firstName}</div>
            <div className="dropdown dropdown-end mx-5 flex">
  
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
        
        </div>
          )}
      </div>
    </>
  );
};

export default NavBar;
