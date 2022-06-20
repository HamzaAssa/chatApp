import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import JoinGroup from "./components/Join/Join";
import CreateGroup from "./components/CreateGroup/CreateGroup";

import { LoginProvider } from "./state/LoginContext";
import { MobileSideBarProvider } from "./state/MobileSideBarContext";

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <MobileSideBarProvider>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/joingroup" element={<JoinGroup />} />
            <Route path="/creategroup" element={<CreateGroup />} />
          </Routes>
        </MobileSideBarProvider>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
