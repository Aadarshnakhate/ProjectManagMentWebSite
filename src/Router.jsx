
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./LoginConponent/Login.jsx";
import Home from "./Home/Home.jsx";
 import User from "./AdminComponent/Users.jsx";
 import AddProject from "./AdminComponent/AddProject.jsx";
import UserDashBoard from "./UserComponent/UserDashBoard.jsx";
import DashBoard from "./AdminComponent/DashBoard.jsx";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/Login" element={<Login />} />
          <Route path="/DashBoard" element={<DashBoard/>}></Route>
         <Route path="/AddProject" element={<AddProject />}></Route> 
        <Route path="/UserDashBoard" element={<UserDashBoard />}></Route> 
         <Route path="/UserTable" element={<User />}></Route> 
        
       </Routes>
    </BrowserRouter>
  );
};

export default Routers;
