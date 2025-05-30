import Body from "./components/Body";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connection from "./components/Connection";
import Requests from "./components/Requests";
import Chat from "./components/Chat";


function App() {

 
  return (
    <>
      <Provider store={appStore}>
  <BrowserRouter basename="/">
    <Routes>
      <Route path="" element={<Body />}>
        {/* Redirect root path to /feed */}
        <Route index element={<Navigate to="/feed" replace />} />
        
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/connections" element={<Connection />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/chat/:toTargetUserId" element={<Chat />} />
      </Route>
    </Routes>
  </BrowserRouter>
</Provider>
    </>
  );
}

export default App;
