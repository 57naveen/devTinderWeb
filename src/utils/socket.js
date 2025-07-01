import io from "socket.io-client"

import { BASE_URL } from "./constants"

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"]
    });
  } else {
    return io("https://devtinder-backend-mosg.onrender.com", {
      withCredentials: true,
      transports: ["websocket", "polling"]
    });
  }
};