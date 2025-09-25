import React, { useEffect, useState } from "react";
import Table from "../tableComponent/Table";
import axios from "axios";

const AllProjectHistory = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Project Name", accessor: "projectName" },
    { header: "Date", accessor: "date" },
    { header: "Deleted At", accessor: "deletedAt" },
    { header: "Created At", accessor: "createdAt" },
  ];

  // 🔹 Helper to format datetime
  const formatDate = (dateString) => {
    if (!dateString) return "-"; // handle null
    return new Date(dateString).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5016/api/Project/GetAllProjects");

        // 🔹 Convert dates before setting state
        const formattedData = res.data.map((p) => ({
          ...p,
          date: formatDate(p.date),
          deletedAt: formatDate(p.deletedAt),
          createdAt: formatDate(p.createdAt),
        }));

        setProjects(formattedData);
      } catch (error) {
        console.error("❌ Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading project history...</p>
      ) : (
        <Table
          columns={columns}
          data={projects}
          Title="All Project History"
          backPath="/DashBoard"
        />
      )}
    </div>
  );
};

export default AllProjectHistory;
