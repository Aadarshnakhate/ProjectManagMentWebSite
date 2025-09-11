import React from 'react';
import Table from '../tableComponent/Table.jsx';

const ProjectOverviewTable = () => {
  const columns = [
    { header: 'Project Name', accessor: 'projectName' },
    { header: 'Total Tasks', accessor: 'totalTasks' },
    { header: 'Completed Tasks', accessor: 'completedTasks' },
    { header: 'Pending Tasks', accessor: 'pendingTasks' },
  ];

  const data = [
    {
      projectName: 'Alpha',
      totalTasks: 10,
      completedTasks: 6,
      pendingTasks: 4,
    },
    {
      projectName: 'Beta',
      totalTasks: 8,
      completedTasks: 5,
      pendingTasks: 3,
    },
    {
      projectName: 'Gamma',
      totalTasks: 12,
      completedTasks: 10,
      pendingTasks: 2,
    },
    {
      projectName: 'Delta',
      totalTasks: 15,
      completedTasks: 11,
      pendingTasks: 4,
    },
  ];

  return (
    <div>
      <h3>Project Overview</h3>
      <Table columns={columns} data={data} Title="Project Overview" backPath="/UserDashBoard"/>
    </div>
  );
};

export default ProjectOverviewTable;
