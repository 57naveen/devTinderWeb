import Body from "./components/Body";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Profile from "./components/Profile";

function App() {
  return (

    <>
    <BrowserRouter basename="/" >
      <Routes>
        <Route path="/" element={<Body/>} > 
        <Route path="/login" element={<Profile/>} />
        <Route path="/test" element={<div>test page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>


  
  );
}

export default App;
