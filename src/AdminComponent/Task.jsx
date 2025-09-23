import React, { useEffect, useState } from "react";
import Table from "../tableComponent/Table.jsx";
import axios from "axios";

const TimeSheet = () => {
  const [Data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userFilter, setUserFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState(""); // month, week, day, year

  const [totalHours, setTotalHours] = useState(0);
  const columns = [
    { header: "Name", accessor: "UserName" },
    { header: "Project Name", accessor: "projectName" },
    { header: "Task", accessor: "task" },
    { header: "Project Description", accessor: "projectdescription" },
    { header: "Date", accessor: "date" },
    { header: "Time", accessor: "hours" },
 
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5016/All");
        console.log("Hello");
        console.log("Fetched data:", response.data);
        const formattedData = response.data.map((TimeSheet) => ({
          timeSheetId: TimeSheet.timeSheetId,
          UserName: TimeSheet.userName,
          task: TimeSheet.timeSheetProjectTask,
          projectName: TimeSheet.projectName,
          projectdescription: TimeSheet.timeSheetDescription,
          date: new Date(TimeSheet.date),
          hours: TimeSheet.hours,
          
        }));

        setData(formattedData);
        setFilteredData(formattedData);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjects();
  }, []);

  // Filtering logic
  useEffect(() => {
    let tempData = [...Data];
    console.log("Filtering data:", tempData);//data befor filter
    const today = new Date();
    console.log("Today's date:", today); // date with time

    // User filter
    if (userFilter) {
      tempData = tempData.filter((d) => d.UserName === userFilter);
    }

    // Project filter
    if (projectFilter) {
      tempData = tempData.filter((d) => d.projectName === projectFilter);
    }

    // Date range filter
    if (dateRangeFilter) {
      tempData = tempData.filter((d) => {
        const dataDate = new Date(d.date);

        switch (dateRangeFilter) {
          case "day":
            return (
              dataDate.getDate() === today.getDate() &&
              dataDate.getMonth() === today.getMonth() &&
              dataDate.getFullYear() === today.getFullYear()
            );

          case "week": {
            const firstDayOfWeek = new Date(today);
            firstDayOfWeek.setDate(today.getDate() - today.getDay()); 
            const lastDayOfWeek = new Date(firstDayOfWeek);
            lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); 
            return dataDate >= firstDayOfWeek && dataDate <= lastDayOfWeek;
          }

          case "month":
            return (
              dataDate.getMonth() === today.getMonth() &&
              dataDate.getFullYear() === today.getFullYear()
            );

          case "year":
            return dataDate.getFullYear() === today.getFullYear();

          default:
            return true;
        }
      });
    }

    setFilteredData(tempData);
    console.log("Filtered data Aaadarsh:", tempData); 
    const totalHours = tempData.reduce(
  (sum, item) => sum + parseFloat(item.hours),
  0
);
setTotalHours(totalHours);
console.log("Total Hours:", totalHours);//5
  }, [userFilter, projectFilter, dateRangeFilter, Data]);

  const handleViewClick = (id) => {
    console.log("View clicked for ID:", id);
  };

  const uniqueUsers = [...new Set(Data.map((d) => d.UserName))];
  const uniqueProjects = [...new Set(Data.map((d) => d.projectName))];

  return (
    <div>
      <h3>Project Overview</h3>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <select value={userFilter} onChange={(e) => setUserFilter(e.target.value)}>
          <option value="">All Users</option>
          {uniqueUsers.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>

        <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
          <option value="">All Projects</option>
          {uniqueProjects.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>

        <select value={dateRangeFilter} onChange={(e) => setDateRangeFilter(e.target.value)}>
          <option value="">All Dates</option>
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>
       <h2>
        Total Hours: {totalHours}
        </h2>  
        console.log("Total Hours in render:", {totalHours});    
      <Table
        columns={columns}
       data={filteredData.map(d => ({
    ...d,
    date: d.date instanceof Date ? d.date.toLocaleDateString() : d.date,
  }))}
        Title="TimeSheet By Project"
        backPath="/DashBoard"
        totalHours={totalHours}
      />

    </div>
  );
};

export default TimeSheet;
