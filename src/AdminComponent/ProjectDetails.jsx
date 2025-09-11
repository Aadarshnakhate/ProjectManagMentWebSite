import React from 'react';
import Table from '../tableComponent/Table.jsx';

const TaskTable = () => {
  // Define logout function
  const logout = () => {
    alert('Logged out!');
    // You can add your logout logic here, e.g. clearing tokens, redirecting, etc.
  };

 const columns = [
  { header: 'ID', accessor: 'ID' },
  { header: 'Name', accessor: 'Name' },
  { header: 'Total Task', accessor: 'TotalTask' },
  { header: 'Pending Task', accessor: 'PendingTask' },
  { header: 'Completed Task', accessor: 'CompletedTask' }
];
const data = [
  {
    ID: '1',
    Name: 'WeatherSite',
    TotalTask: '5',
    PendingTask: '2',
    CompletedTask: '3'
  }
];
  return (
    <div>
      <h3> Task List</h3>
      <Table columns={columns} data={data} Title='Projects' />
    </div>
  );
};

export default TaskTable;
