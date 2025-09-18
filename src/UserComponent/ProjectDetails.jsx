import React, { useEffect, useState } from "react";
import Table from "../tableComponent/Table.jsx";
import axios from "axios";

const ProjectOverviewTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { header: "Project Name", accessor: "projectName" },
    { header: "Description", accessor: "description" },
    { header: "Start Date", accessor: "date" },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5016/api/Team/UserProject"
        );
        const mappedData = response.data.map((project) => ({
          projectName: project.projectName,
          description: project.description,
          date: new Date(project.date).toLocaleDateString(),
        }));
        setData(mappedData);
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h3>Project Overview</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          columns={columns}
          data={data}
          Title="Project Overview"
          backPath="/UserDashBoard"
        />
      )}
    </div>
  );
};

export default ProjectOverviewTable;
