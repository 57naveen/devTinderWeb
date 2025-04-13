import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCards from "./UserCards"

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  // console.log(feed);

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      // console.log(res);
      dispatch(addFeed(res?.data));
    } catch (error) {}
  };

  useEffect(() => {
    getFeed();
  }, []);

  return feed && (
    <>
   
    <div className="flex justify-center my-10">
    <UserCards user={feed[0]}/>

  
    
  </div>;
  </>
  )
 
};

export default Feed;
