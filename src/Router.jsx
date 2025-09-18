import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/LoginConponent/Login.jsx";
import Home from "./Pages/Home/Home.jsx";

import Task from "./AdminComponent/Task.jsx";
import Project from "./AdminComponent/ProjectDetails.jsx";
import AddProject from "./AdminComponent/AddProject.jsx";
import UserDashBoard from "./Pages/UserDashBoard/UserDashBoard.jsx";
import DashBoard from "./AdminComponent/DashBoard.jsx";
import Teams from "./AdminComponent/TeamDetails.jsx";
import AssignTaskToNewUser from "./AdminComponent/AssignTask.jsx";
import EditPage from "./AdminComponent/EditPage.jsx";
import GetAll from "./AdminComponent/getAllUser.jsx";
import Delete from "./AdminComponent/HandleDelete.jsx";
import Hello from "./UserComponent/Hello.jsx";
import UserWorkTableRoute from "./AdminComponent/UserWorkingTable.jsx";
import TaskDetails from "./UserComponent/TaskDetails.jsx";
import Completed from "./UserComponent/CompletedTask.jsx";
import Pending from "./UserComponent/PandingTask.jsx";
import Prjctdtl from "./UserComponent/ProjectDetails.jsx";
import User from "./AdminComponent/Users.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { PiCursorText } from "react-icons/pi";
import Edprjct from "./AdminComponent/EditProject.jsx";
const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AddProject" element={<AddProject />}></Route>
        <Route path="/UserDashBoard" element={<UserDashBoard />}></Route>
        <Route path="/UserTable" element={<User />} />
        <Route path="/TaskTable" element={<Task />} />
        <Route path="/total" element={<Hello />} />
        <Route path="/project" element={<Project />} />
        <Route path="/Hello" element={<Hello />} />
        <Route path="/AssignTaskToNewUser" element={<AssignTaskToNewUser />} />
        <Route path="/EditPage" element={<EditPage />} />
        <Route path="/taskdetails" element={<TaskDetails />} />
        <Route path="/CompleteTask" element={<Completed />} />
        <Route path="/panding" element={<Pending />} />
        <Route path="/projectdtl" element={<Prjctdtl />} />
        <Route path="/team" element={<Teams />} />
        <Route path="/allUsers" element={<GetAll />} />
        <Route path="/delete/:projectName" element={<Delete />} />
        <Route path="/project/:projectId/users" element={<User />} />
        <Route path="/EditProjectDetails" element={<Edprjct />} />
        <Route
          path="/UserWorkTable"
          element={
            <ProtectedRoute>
              <UserWorkTableRoute />
            </ProtectedRoute>
          }
          
        />
        <Route
          path="/DashBoard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
