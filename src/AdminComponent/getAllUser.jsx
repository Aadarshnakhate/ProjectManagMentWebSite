import React, { useEffect, useState } from "react";
import Table from "../tableComponent/Table";

const AllUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [projectFilter, setProjectFilter] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch("http://localhost:5016/api/Team/allUsers",{
  headers: {
    Authorization: `Bearer ${token}`,
  },
    method: "GET",
       
   } )
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((user) => ({
          empId: user.empId,
          empName: user.empName,
          projectName: user.projectName || "No Project",
        }));

        setUsers(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const projectOptions = Array.from(
    new Set(users.map((user) => user.projectName))
  );

  const filteredUsers = users.filter(
    (user) => projectFilter === "" || user.projectName === projectFilter
  );

  const handleProjectFilter = (e) => {
    setProjectFilter(e.target.value);
  };

  const columns = [
    { header: "Emp ID", accessor: "empId" },
    { header: "Emp Name", accessor: "empName" },
    { header: "Project Name", accessor: "projectName" },
  ];

  return (
    <div>
     
        <div style={{ position: "relative", textAlign: "center", margin: 20 }}> 
        
        <div style={{ position: "absolute", left: 950, top: 20 }}>
          <select onChange={handleProjectFilter} value={projectFilter}>
            <option value="">All Projects</option>
            {projectOptions.map((project, index) => (
              <option key={index} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>

      
        
      </div>

     
      <Table columns={columns} data={filteredUsers} Title="Users" />
    </div>
  );
};

export default AllUsersTable;

