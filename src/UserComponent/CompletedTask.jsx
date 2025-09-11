import React from 'react';
import Table from '../tableComponent/Table.jsx';

const CompletedTaskTable = () => {
  const columns = [
    { header: 'User', accessor: 'user' },
    { header: 'Total Completed Tasks', accessor: 'completedTask' },
  ];

  const data = [
    { user: 'I', completedTask: 5 },
    { user: 'J', completedTask: 3 },
    { user: 'K', completedTask: 7 },
    { user: 'L', completedTask: 2 },
  ];

  return (
    <div>
      <h3>Completed Tasks</h3>
      <Table columns={columns} data={data} Title="Completed Tasks" />
    </div>
  );
};

export default CompletedTaskTable;
