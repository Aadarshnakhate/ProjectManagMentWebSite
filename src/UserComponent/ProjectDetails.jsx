import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../tableComponent/Table.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ProjectOverviewTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  console.log("User ID from params:", username);
  const navigate = useNavigate();
  const columns = [
    { header: "Project Name", accessor: "projectName" },
    { header: "Description", accessor: "description" },
    { header: "Start Date", accessor: "date" },
    { header: "FileTimeSheet", accessor: "fileTimesheet" },
  ];
  const handleFileClick = (projectId, username) => {
    console.log("Navigating to timesheet for project ID:", projectId);
    navigate(`/TimeSheetByProject/${projectId}/${username}`);
    console.log("Navigated to /TimeSheetByProject with project ID:", projectId);
    console.log("Project ID type:", typeof projectId);
  };
  const HandleAddUser = (projectID, username) => {
    navigate(`/AddTimeSheet/${username}/${projectID}`);
  };
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5016/api/Team/UserProject",
          username,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const mappedData = response.data.map((project) => ({
          projectId: project.id,
          projectName: project.projectName,
          description: project.description,
          date: new Date(project.date).toLocaleDateString(),
          fileTimesheet: (
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => handleFileClick(project.id, username)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#1D4ED8",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                View
              </button>

              <button
                onClick={() => HandleAddUser(project.id, username)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#1D4ED8",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add TimeSheet
              </button>
            </div>
          ),
        }));

        setData(mappedData);
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [username]);

  return (
    <div>
      <h3>Project Overview</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          columns={columns}
          data={data}
          Title="Project Overview"
          backPath="/UserDashBoard"
        />
      )}
    </div>
  );
};

export default ProjectOverviewTable;
