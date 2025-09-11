import React from 'react';
import Table from '../tableComponent/Table.jsx';

const UserTaskTable = () => {
  const columns = [
    { header: 'User', accessor: 'user' },
    { header: 'Project', accessor: 'project' },
    { header: 'Task No', accessor: 'taskNo' },
  ];

  const data = [
    { user: 'E', project: 'Alpha', taskNo: 201 },
    { user: 'F', project: 'Beta', taskNo: 202 },
    { user: 'G', project: 'Gamma', taskNo: 203 },
    { user: 'H', project: 'Delta', taskNo: 204 },
  ];

  return (
    <div>
      <h3>User Tasks</h3>
      <Table columns={columns} data={data} Title="User Tasks" />
    </div>
  );
};

export default UserTaskTable;
