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
      totalTasks: 2,
      completedTasks: 1,
      pendingTasks: 1,
    },
    {
      projectName: 'Beta',
      totalTasks: 1,
      completedTasks: 2,
      pendingTasks: 3,
    },
    {
      projectName: 'Gamma',
      totalTasks: 2,
      completedTasks: 0,
      pendingTasks: 2,
    },
    {
      projectName: 'Delta',
      totalTasks: 3,
      completedTasks: 2,
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
