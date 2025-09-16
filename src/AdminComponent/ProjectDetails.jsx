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

  const handleEdit = (id) => {
    navigate(`/AssignTaskToNewUser`);
  };

  const handleDetails = (id) => {
    alert(`View details for project ID: ${id}`);
  };

  const HendleDelete = async (projectName) => {
    debugger;
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
            <button style={{ color: "green" }} onClick={() => HandleNewUser}>
              Add NewUser
            </button>
          ),
          Action: (
            <>
              <button
                style={{ backgroundColor: "blue" }}
                onClick={() => handleEdit(item.id)}
              >
                Edit
              </button>
              <button
                style={{ backgroundColor: "red" }}
                onClick={() => HendleDelete(item.projectName)}
              >
                {" "}
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
