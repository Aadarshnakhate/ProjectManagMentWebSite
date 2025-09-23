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

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);
  const navigate = useNavigate();
  const logout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found! Redirect to login or show error");
      return;
    }
    fetch("http://localhost:5016/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/");
  };
  const showUsers = () => {
    navigate("/allUsers");
  };
  const showTimeSheet = () => {
    navigate("/TaskTable");
  };
  const showProject = () => {
    navigate("/project");
  };
  const HandleUserWorkTable = () => {
    navigate("/UserWorkTable");
  }

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

          <li onClick={HandleUserWorkTable}>UserWorkTable</li>

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
            onClick={showTimeSheet}
            title="TimeSheet"
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
