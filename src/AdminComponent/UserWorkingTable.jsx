import React, { useEffect, useState } from "react";
import Table from "../tableComponent/Table";

const AllUsersTable = () => {
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    fetch("http://localhost:5016/api/Users/Working_time")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const formattedData = data.map((workTime) => ({
          empId: workTime.id,
          empName: workTime.username,
          loginStatus: workTime.loginTime,
          logoutStatus: workTime.logoutTime ||"-",
        }));

        setUsers(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const columns = [
    { header: "Emp ID", accessor: "empId" },
    { header: "Emp Name", accessor: "empName" },
    { header: "Login Status", accessor: "loginStatus" },
    { header: "Logout Time", accessor: "logoutStatus" },
  ];

  return (
    <div>
      <Table columns={columns} data={users} Title="UserWorkTime" />
    </div>
  );
};

export default AllUsersTable;
