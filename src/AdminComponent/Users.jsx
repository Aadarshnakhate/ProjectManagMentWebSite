import React from 'react';
import Table from '../tableComponent/Table.jsx';

const TaskTable = () => {
  // Define logout function
  const logout = () => {
    alert('Logged out!');
    // You can add your logout logic here, e.g. clearing tokens, redirecting, etc.
  };

  const columns = [
    { header: 'Id', accessor: 'UserID' },
    { header: 'Name', accessor: 'Name' },
    { header: 'Task', accessor: 'Number' },
    { header: 'Projects', accessor: 'Projects' },
    { header: '        ', accessor: 'view All' }
  ];

  const data = [
    {
      UserID: 1,
      Name: 'Aaa',
      Number: 5,
      Projects: 2,
      '        ': (
        <button style={{ color: 'blue' }} className="logout-btn" onClick={logout}>
          Logout
        </button>
      )
    }
  ];
  
  

  return (
    <div>
      <h3> Task List</h3>
      <Table columns={columns} data={data} Title='Users' />
    </div>
  );
};

export default TaskTable;
