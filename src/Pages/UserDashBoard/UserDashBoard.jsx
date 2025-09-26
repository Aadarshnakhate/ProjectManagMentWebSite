import React, { useEffect, useState } from "react";
import Card from "../../UserComponent/Card";
import {
  FaTasks,
  FaProjectDiagram,
  FaHourglassHalf,
  FaCheckCircle,
  FaBars,
  FaBell,
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import "./UserDashBoard.css";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const [username, setUsername] = useState("User");

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const Navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");

    if (storedUser) setUsername(storedUser);

    setTimeout(() => {
      setTasks([
        {
          id: 1,
          title: "Design System Update",
          status: "In Progress",
          priority: "High",
          dueDate: "2024-01-15",
        },
        {
          id: 2,
          title: "User Authentication",
          status: "Completed",
          priority: "High",
          dueDate: "2024-01-10",
        },
        {
          id: 3,
          title: "Database Migration",
          status: "Pending",
          priority: "Medium",
          dueDate: "2024-01-20",
        },
        {
          id: 4,
          title: "API Documentation",
          status: "Pending",
          priority: "Low",
          dueDate: "2024-01-25",
        },
        {
          id: 5,
          title: "Performance Optimization",
          status: "In Progress",
          priority: "High",
          dueDate: "2024-01-18",
        },
      ]);

      setProjects([
        { id: 1, name: "E-commerce Platform", progress: 75, status: "Active" },
        { id: 2, name: "Mobile App", progress: 45, status: "Active" },
        {
          id: 3,
          name: "Analytics Dashboard",
          progress: 90,
          status: "Near Completion",
        },
      ]);
      setLoading(false);
    }, 0);
  }, []);

  const handleclick = () => {
    Navigate("/Hello");
  };
  const handleTask = () => {
    Navigate("/taskdetails");
  };
  const handleProject = () => {
    Navigate(`/projectdtl/${username}`);
  };
  const handleCompleted = () => {
    Navigate("/CompleteTask");
  };
  const handlepanding = () => {
    Navigate("/panding");
  };

 
 const logout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found! Redirect to login or show error");
      return;
    }
    fetch("http://localhost:5016/logout", {   ///This API Use To set Data in UserWorkTable
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    Navigate("/Login");
  };


  const pendingTasks = tasks.filter(
    (t) => t.status.toLowerCase() !== "completed"
  );
  const completedTasks = tasks.filter(
    (t) => t.status.toLowerCase() === "completed"
  );
  const inProgressTasks = tasks.filter(
    (t) => t.status.toLowerCase() === "in progress"
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <h3>ProjectHub</h3>
          <button className="sidebar-close" onClick={toggleSidebar}>
            ×
          </button>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <FaHome className="nav-icon" />
            Dashboard
          </a>
          <a href="#" className="nav-item" onClick={handleTask}>
            <FaTasks className="nav-icon" />
            Tasks
          </a>
          <a href="#" className="nav-item" onClick={handleProject}>
            <FaProjectDiagram className="nav-icon" />
            Projects
          </a>
          <a href="#" className="nav-item" onClick={handlepanding}>
            <FaHourglassHalf className="nav-icon" />
            Pending
          </a>
          <a href="#" className="nav-item" onClick={handleCompleted}>
            <FaCheckCircle className="nav-icon" />
            Completed
          </a>
        </nav>
      </div>

      <div className="main-content">
        <header className="top-header">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <FaBars />
            </button>
            <h1>Welcome back, {username}! 👋</h1>
          </div>
          <div className="header-right">
            <button className="notification-btn">
              <FaBell />
              <span className="notification-badge">3</span>
            </button>
            <div className="user-profile">
              <FaUser />
              <span>{username}</span>
            </div>
            <button className="logout-btn" onClick={logout}>
              <FaSignOutAlt />
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="stats-section">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
             
              <Card
                title="Active Projects"
              
                color="green"
                icon={<FaProjectDiagram />}
                onclick={handleProject}
                subtitle="Projects in progress"
              />
              
             
            </div>
          </section>
        </div>
      </div>

      {sidebarOpen && (
        <div className="mobile-overlay" onClick={toggleSidebar}></div>
      )}
    </div>
  );
}

export default UserDashboard;
