import "./Dashboard.css";

import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Card from "./CardComponent";
//import { Link } from "react-router-dom";
import AddProject from "./AddProject";
import { FaUsers, FaTasks, FaProjectDiagram, FaBuilding } from "react-icons/fa";
import AddUser from "./AddUser";
import NewTaskAssign from "./AssignTask";
//import UserTable from "./Users";

function Dashboard() {
  const [username, setUsername] = useState("");
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newTaskAssign,setNewTaskAssign]=useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };
  const showUsers = () => {
    navigate("/allUsers");
  };
  const showTask = () => {
    navigate("/TaskTable");
  };
  const showProject = () => {
    navigate("/project");
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">
          <FaBuilding style={{ marginRight: "10px", color: "#00a99d" }} />
          Projects
        </h2>

        <ul className="menu">
          <li className="active">Dashboard</li>
          <li onClick={() => setShowAddProject(true)}>Add Project</li>
          {showAddProject && (
            <div
              className="modal-overlay"
              onClick={() => setShowAddProject(false)} 
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()} 
              >
                <button
                  className="close-btn"
                  onClick={() => setShowAddProject(false)}
                >
                  ✖
                </button>
                <AddProject />
              </div>
            </div>
          )}

         <li onClick={() => setNewTaskAssign(true)}>Assign Task</li>
{newTaskAssign && (
  <>
    <div
      className="modal-overlay"
              onClick={() => setNewTaskAssign(false)}
    ></div>
    <div
      className="modal-content"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="close-btn"
                    onClick={() => setNewTaskAssign(false)}
      >
        ✖
      </button>
      <NewTaskAssign />
    </div>
  </>
)}
          <li onClick={() => setShowAddUser(true)}>Add Uer</li>
          {showAddUser && (
            <div
              className="modal-overlay"
              onClick={() => setShowAddUser(false)}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="close-btn"
                  onClick={() => setShowAddUser(false)}
                >
                  ✖
                </button>
                <AddUser />
              </div>
            </div>
          )}
        </ul>
      </aside>

  
      <main className="main-content">
        <header className="header">
          <h3>Welcome, {username || "Admin"}</h3>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </header>

        <h2 className="section-title">📊 Dashboard Overview</h2>
        <div className="overview-cards">
          <Card
            onClick={showUsers}
            title="Users"
            value="5"
            color="teal"
            icon={<FaUsers size={50} />}
          />
          <Card
            onClick={showTask}
            title="Tasks"
            value="3"
            color="yellow"
            icon={<FaTasks size={50} />}
          />
          <Card
            onClick={showProject}
            title="Projects"
            value="12"
            color="red"
            icon={<FaProjectDiagram size={50} />}
          />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
