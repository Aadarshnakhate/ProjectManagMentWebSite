import React, { useState } from 'react';
import Table from '../tableComponent/Table.jsx';

const PendingTaskTable = () => {
  // Initialize state for data so we can update the dropdown value per row
  const [data, setData] = useState([
    { id: 1, user: 'A', taskNo: 101, project: 'Alpha', pendingTask: 2, status: 'Pending' },
    { id: 2, user: 'B', taskNo: 102, project: 'Beta', pendingTask: 1, status: 'Pending' },
    { id: 3, user: 'C', taskNo: 103, project: 'Gamma', pendingTask: 3, status: 'Pending' },
    { id: 4, user: 'D', taskNo: 104, project: 'Delta', pendingTask: 4, status: 'Pending' },
  ]);

  // Columns include new Status column
  const columns = [
    { header: 'User', accessor: 'user' },
    { header: 'Task No', accessor: 'taskNo' },
    { header: 'Project', accessor: 'project' },
    { header: 'Pending Task', accessor: 'pendingTask' },
    { header: 'Status', accessor: 'status' }, // We'll render dropdown manually
  ];

  // Handle status change for a row
  const handleStatusChange = (id, newStatus) => {
    setData(prevData =>
      prevData.map(row =>
        row.id === id ? { ...row, status: newStatus } : row
      )
    );
  };

  // Custom render data for Status column with dropdown
  const renderData = data.map(row => ({
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
      <Table columns={columns} data={renderData} Title="Pending Tasks" />
    </div>
  );
};

export default PendingTaskTable;