import React, { useEffect, useState } from "react";
import Card from "../../UserComponent/Card";
import {
  FaTasks,
  FaProjectDiagram,
  FaHourglassHalf,
  FaCheckCircle,
} from "react-icons/fa";
import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const [username, setUsername] = useState("User");
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);

    // Example data (replace with API calls)
    setTasks([
      { id: 1, title: "Task 1", status: "Pending" },
      { id: 2, title: "Task 2", status: "Completed" },
      { id: 3, title: "Task 3", status: "In Progress" },
    ]);

    setProjects([
      { id: 1, name: "Project A" },
      { id: 2, name: "Project B" },
    ]);
  }, []);

  const handleclick = () => {
    Navigate("/Hello");
  };
   const handleTask = () => {
    Navigate("/taskdetails");
  };
   const handleProject = () => {
    alert("click");
    Navigate("/projectdtl");
  };
   const handleCompleted= () => {
    Navigate("/CompleteTask");
  };
const handlepanding= () => {
    Navigate("/panding");
  };

  const Logout = () => {
    localStorage.removeItem("username");
    Navigate("/Login");
  };

  const pendingTasks = tasks.filter(
    (t) => t.status.toLowerCase() !== "completed"
  );
  const completedTasks = tasks.filter(
    (t) => t.status.toLowerCase() === "completed"
  );

  return (
    <div className="user-dashboard">
      <header className="header">
        <h2>Welcome, {username} 👋</h2>

        <button onClick={Logout}>Logout</button>
      </header>

      <section className="dashboard-overview">
        <h3>📊 Dashboard Overview</h3>
        <div className="overview-cards">
          <Card

            title="Total Tasks"
            value={tasks.length}
            color="blue"
            icon={<FaTasks />}
            onclick={handleTask}
          />
          <Card
            title="My Projects"
            value={projects.length}
            color="green"
            icon={<FaProjectDiagram />}
            onclick={handleProject}
          />
          <Card
            title="Pending Tasks"
            value={pendingTasks.length}
            color="orange"
            icon={<FaHourglassHalf />}
            onclick={handlepanding}
          />
          <Card
            title="Completed Tasks"
            value={completedTasks.length}
            color="teal"
            icon={<FaCheckCircle />}
            onclick={handleCompleted}
          />
        </div>
      </section>
    </div>
  );
}

export default UserDashboard;
