import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const Navigate = useNavigate();

  const fetchUser = async () => {
    if (userData) return; // if userDate is there then don't make another API call return here

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        Navigate("/login");
      }

      // console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <NavBar />
        <main className="flex-grow">
          <Outlet />
          {/* This Outlet is used to render the children component inside the parent component */}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Body;
