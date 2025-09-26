import React, { useEffect, useState } from "react";
import Table from "../tableComponent/Table";

const AllUsersTable = () => {
  const [users, setUsers] = useState([]);
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  useEffect(() => {
    fetch("http://localhost:5016/api/Users/Working_time")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const formattedData = data.map((workTime) => ({
          empId: workTime.id,
          empName: workTime.username,
          loginStatus: formatDate(workTime.loginTime),
          logoutStatus: formatDate(workTime.logoutTime),
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
