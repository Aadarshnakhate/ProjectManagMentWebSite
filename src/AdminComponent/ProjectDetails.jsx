import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../tableComponent/Table.jsx";

const TaskTable = () => {
  const [data, setData] = useState([]); // <-- Add state for data
  const navigate = useNavigate();
  const logout = () => {
    alert("Logged out!");
  };
  const HandleView = () => {
    navigate("/team");
  };
  const HendleEdit = () => {
    navigate("/team");
  };
  const HendleDelete = () => {
    navigate("/team");
  };

  useEffect(() => {
    fetch("http://localhost:5016/api/Project/Project")
      .then((res) => res.json())
      .then((fetchedData) => {
        const formattedData = fetchedData.map((item, index) => ({
          ID: item.id?.toString() || index.toString(),
          ProjectName: item.projectName || "N/A",

          Team: <button onClick={HandleView}>View</button>,

          Details: (
            <button
              style={{ color: "green" }}
              onClick={HendleEdit}
                          >
              Details
            </button>
          ),
          Action: (
            <>
              <button
                style={{ backgroundColor: "blue" }}
                onClick={HendleEdit}
              >
                Edit
              </button>
              <button
                style={{ backgroundColor: "Red" }}
                
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
  // Column accessors must match keys in data objects
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
