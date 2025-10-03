import React, { useEffect, useState } from "react";
import Table from "../tableComponent/Table";
import axios from "axios";

const AllProjectHistory = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Active"); // default to Active

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Project Name", accessor: "projectName" },
    { header: "Date", accessor: "date" },
    { header: "Deleted At", accessor: "deletedAt" },
    { header: "Created At", accessor: "createdAt" },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Fetch projects whenever filter changes
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5016/api/Project/GetAllProjects?statusString=${filter}`
        );
         console.log("Fetched projects:", res.data.status);
         console.log(res.data.message);
        console.log("Fetched projects:", res.data.project);
         const formattedData = res.data.project.map((p) => ({
          ...p,
          date: formatDate(p.date),
          deletedAt: formatDate(p.deletedAt),
          createdAt: formatDate(p.createdAt),
        }));

        setProjects(formattedData);
      } catch (error) {
        console.error("❌ Error fetching project data:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filter]);

  return (
    <div>
      {loading ? (
        <p>Loading project history...</p>
      ) : (
        <>
          {/* Filter buttons */}
          <div style={{ marginBottom: "1rem", display: "flex", gap: "10px" }}>
            <button
              onClick={() => setFilter("Active")}
              style={{
                padding: "6px 12px",
                backgroundColor: filter === "Active" ? "#28a745" : "#f0f0f0",
                color: filter === "Active" ? "white" : "black",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Active Projects
            </button>
            <button
              onClick={() => setFilter("Deleted")}
              style={{
                padding: "6px 12px",
                backgroundColor: filter === "Deleted" ? "#dc3545" : "#f0f0f0",
                color: filter === "Deleted" ? "white" : "black",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Deleted Projects
            </button>
          </div>

          {/* Table */}
          <Table
            columns={columns}
            data={projects}
            Title={filter === "Active" ? "Active Projects" : "Deleted Projects"}
            backPath="/DashBoard"
          />
        </>
      )}
    </div>
  );
};

export default AllProjectHistory;
