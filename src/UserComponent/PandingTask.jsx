import React, { useState } from "react";
import Table from "../tableComponent/Table.jsx";

const PendingTaskTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      user: "A",
      taskNo: 101,
      project: "Alpha",
      pendingTask: 2,
      status: "Pending",
    },
    {
      id: 2,
      user: "A",
      taskNo: 102,
      project: "Beta",
      pendingTask: 1,
      status: "Pending",
    },
  ]);

  const columns = [
    { header: "User", accessor: "user" },
    { header: "Task No", accessor: "taskNo" },
    { header: "Project", accessor: "project" },
    { header: "Pending Task", accessor: "pendingTask" },
    { header: "Status", accessor: "status" },
  ];

  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, status: newStatus } : row
      )
    );
  };

  const renderData = data.map((row) => ({
    ...row,
    status: (
      <select
        value={row.status}
        onChange={(e) => handleStatusChange(row.id, e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="Update">Update</option>
        <option value="Completed">Completed</option>
      </select>
    ),
  }));

  return (
    <div>
      <h3>Pending Tasks</h3>
      <Table
        columns={columns}
        data={renderData}
        Title="Pending Tasks"
        backPath="/UserDashBoard"
      />
    </div>
  );
};

export default PendingTaskTable;
