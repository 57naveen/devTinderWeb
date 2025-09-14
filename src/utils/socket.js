import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    // Local development
    return io(BASE_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
  } else if (location.hostname === "16.170.231.228") {
    // AWS deployment
    return io("http://16.170.231.228/api", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
  } else {
    // Fallback: Render deployment
    return io("https://devtinder-backend-mosg.onrender.com", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
  }
};
