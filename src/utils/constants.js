let BASE_URL = "";

if (location.hostname === "localhost") {
  // Local dev
  BASE_URL = "http://localhost:5555";
} else if (location.hostname.includes("onrender.com")) {
  // Render backend
  BASE_URL = "https://devtinder-backend-mosg.onrender.com";
} else {
  // Default for AWS reverse proxy (Nginx serving /api)
  BASE_URL = "/api";
}

export { BASE_URL };
