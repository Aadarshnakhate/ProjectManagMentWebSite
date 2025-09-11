import React from 'react';
import Table from '../tableComponent/Table.jsx';

const TaskTable = () => {
  const columns = [
    { header: 'Task Name', accessor: 'taskName' },
    { header: 'Assigned To', accessor: 'assignedTo' },
    { header: 'Status', accessor: 'status' },
    { header: 'Due Date', accessor: 'dueDate' },
  ];

  const data = [
    {
      taskName: 'Create Login Page',
      assignedTo: 'Alice',
      status: 'In Progress',
      dueDate: '2025-09-15',
    },
    {
      taskName: 'Setup Database',
      assignedTo: 'Bob',
      status: 'Completed',
      dueDate: '2025-09-10',
    },
  ];

  return (
    <div>
      <h3> Task List</h3>
      <Table columns={columns} data={data} Title='Task'/>
    </div>
  );
};

export default TaskTable;
