import React, { useEffect, useState } from "react";
import Card from "./Card";
import { FaTasks, FaProjectDiagram, FaHourglassHalf, FaCheckCircle } from "react-icons/fa";
import "./UserDashboard.css";

function UserDashboard() {
  const [username, setUsername] = useState("User");
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);

    // Example data (replace with API calls)
    setTasks([
      { id: 1, title: "Task 1", status: "Pending" },
      { id: 2, title: "Task 2", status: "Completed" },
      { id: 3, title: "Task 3", status: "In Progress" }
    ]);

    setProjects([
      { id: 1, name: "Project A" },
      { id: 2, name: "Project B" }
    ]);
  }, []);

  const pendingTasks = tasks.filter(t => t.status.toLowerCase() !== "completed");
  const completedTasks = tasks.filter(t => t.status.toLowerCase() === "completed");

  return (
    <div className="user-dashboard">
      <header className="header">
        <h2>Welcome, {username} 👋</h2>
      </header>

      <section className="dashboard-overview">
        <h3>📊 Dashboard Overview</h3>
        <div className="overview-cards">
          <Card title="Total Tasks" value={tasks.length} color="blue" icon={<FaTasks />} />
          <Card title="My Projects" value={projects.length} color="green" icon={<FaProjectDiagram />} />
          <Card title="Pending Tasks" value={pendingTasks.length} color="orange" icon={<FaHourglassHalf />} />
          <Card title="Completed Tasks" value={completedTasks.length} color="teal" icon={<FaCheckCircle />} />
        </div>
      </section>
    </div>
  );
}

export default UserDashboard;

