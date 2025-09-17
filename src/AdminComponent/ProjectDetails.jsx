import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../tableComponent/Table.jsx";
import HandleDelete from "./HandleDelete";

const TaskTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    alert("Logged out!");
  };

  const handleView = (id) => {
    navigate(`/project/${id}/users`);
  };

  const handleEdit = (project) => {
    navigate("/EditProjectDetails", {
      state: {
        id: project.id,
        projectName: project.projectName,
        description: project.description,
        deadline: project.deadline,
      },
    });
  };

  const handleDetails = (id) => {
    alert(`View details for project ID: ${id}`);
  };

  const handleDelete = async (projectName) => {
    try {
      await HandleDelete(projectName);
      console.log("Project deleted successfully!");
      setData((prevData) =>
        prevData.filter((item) => item.ProjectName !== projectName)
      );
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5016/api/Project/Project")
      .then((res) => res.json())
      .then((fetchedData) => {
        const formattedData = fetchedData.map((item, index) => ({
          ProjectId: item.id || "N/A",
          ID: index + 1,
          ProjectName: item.projectName || "N/A",
          Team: <button onClick={() => handleView(item.id)}>View</button>,
          Details: (
            <button style={{ color: "green" }} onClick={() => handleEdit(item)}>
              Add User
            </button>
          ),
          Action: (
            <>
              <button
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  marginRight: "5px",
                }}
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => handleDelete(item.projectName)}
              >
                Delete
              </button>
            </>
          ),
        }));

        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns = [
    { header: "ID", accessor: "ID" },
    { header: "Project Name", accessor: "ProjectName" },
    { header: "Team", accessor: "Team" },
    { header: "Details", accessor: "Details" },
    { header: "Action", accessor: "Action" },
  ];

  return (
    <div>
      <h3>Task List</h3>
      <Table columns={columns} data={data} Title="Projects" />
    </div>
  );
};

export default TaskTable;
