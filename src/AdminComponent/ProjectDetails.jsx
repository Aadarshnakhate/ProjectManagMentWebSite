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
    console.log("Id", id);
    navigate(`/project/${id}/users`);
  };

  const handleEdit = (project) => {
    console.log("Project ", project);
    navigate("/EditProjectDetails", {
      state: {
        id: project.id,
        projectName: project.projectName,
        description: project.description,
        deadline: project.deadline,
      },
    });
  };

  const handleAddUser = (project) => {
    navigate("/AddUserProject", {
      state: {
        id: project.id,
        projectName: project.projectName,
        description: project.description,
        deadline: project.deadline,
      },
    });
  };

  const handleDelete = async (projectName) => {
    try {
      await HandleDelete(projectName);
      
      setData((prevData) =>
        prevData.filter((item) => item.ProjectName !== projectName)
      );
      setTimeout(() => {
         alert(res.data.message);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5016/api/Project/Project");
        console.log("api=", res);
        const ApiData = await res.json();
        console.log("api=", ApiData);
        const fetchedData = ApiData.filter((i) => i.isDeleted === 1);
        console.log("await res,jason()", fetchedData);
        const formattedData = fetchedData.map((item, index) => ({
          ProjectId: item.id || "N/A",
          ID: index + 1,
          ProjectName: item.projectName || "N/A",
          Team: <button onClick={() => handleView(item.id)}>View</button>,
          Details: (
            <button
              style={{ color: "green" }}
              onClick={() => handleAddUser(item)}
            >
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
        console.log("formate data ", formattedData);
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
