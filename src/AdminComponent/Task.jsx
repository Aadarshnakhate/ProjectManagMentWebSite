import React, { useEffect, useState } from "react";
import Table from "../tableComponent/Table.jsx";
import axios from "axios";

const TimeSheet = () => {
  const [Data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userFilter, setUserFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [monthRangeFilter, setMonthRangeFilter] = useState("");

  const [totalHours, setTotalHours] = useState(0);

  const columns = [
    { header: "Name", accessor: "UserName" },
    { header: "Project Name", accessor: "projectName" },
    { header: "Task", accessor: "task" },
    { header: "Project Description", accessor: "projectdescription" },
    { header: "Date", accessor: "date" },
    { header: "Time", accessor: "hours" },
  ];


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5016/All");
        const formattedData = response.data.map((TimeSheet) => ({
          timeSheetId: TimeSheet.timeSheetId,
          UserName: TimeSheet.emp_Name,
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


  useEffect(() => {
    let tempData = [...Data];
    const today = new Date();

 
    if (userFilter) {
      tempData = tempData.filter((d) => d.UserName === userFilter);
    }

 
    if (projectFilter) {
      tempData = tempData.filter((d) => d.projectName === projectFilter);
    }

    if (yearFilter) {
      tempData = tempData.filter(
        (d) => d.date.getFullYear().toString() === yearFilter
      );
    }


    if (monthRangeFilter) {
      const refYear = yearFilter ? parseInt(yearFilter) : today.getFullYear();
      const refMonth = today.getMonth();
      const endDate = yearFilter
        ? new Date(refYear, 11, 31) // Dec 31 of that year
        : today;

      const startDate = new Date(refYear, refMonth, 1);

      if (monthRangeFilter !== "1") {
        startDate.setMonth(refMonth - (parseInt(monthRangeFilter) - 1));
      }

      tempData = tempData.filter(
        (d) => d.date >= startDate && d.date <= endDate
      );
    }


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


    tempData.sort((a, b) => {
      if (a.date.getFullYear() !== b.date.getFullYear()) {
        return b.date.getFullYear() - a.date.getFullYear();
      }
      return b.date - a.date;
    });

    setFilteredData(tempData);

    const totalHours = tempData.reduce(
      (sum, item) => sum + parseFloat(item.hours),
      0
    );
    setTotalHours(totalHours);
  }, [
    userFilter,
    projectFilter,
    dateRangeFilter,
    yearFilter,
    monthRangeFilter,
    Data,
  ]);

  const uniqueUsers = [...new Set(Data.map((d) => d.UserName))];
  const uniqueProjects = [...new Set(Data.map((d) => d.projectName))];
  const uniqueYears = [...new Set(Data.map((d) => d.date.getFullYear()))].sort(
    (a, b) => b - a
  );

  return (
    <div>
      <h3>Project Overview</h3>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
    
        <select
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        >
          <option value="">All Users</option>
          {uniqueUsers.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>

   
        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
        >
          <option value="">All Projects</option>
          {uniqueProjects.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>

  
        <select
          value={dateRangeFilter}
          onChange={(e) => setDateRangeFilter(e.target.value)}
        >
          <option value="">All Dates</option>
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>

     
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="">All Years</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

     
        <select
          value={monthRangeFilter}
          onChange={(e) => setMonthRangeFilter(e.target.value)}
        >
          <option value="">All Months</option>
          <option value="1">This Month</option>
          <option value="3">Last 3 Months</option>
          <option value="6">Last 6 Months</option>
        </select>
      </div>

      <h2>Total Hours: {totalHours}</h2>

      <Table
        columns={columns}
        data={filteredData.map((d) => ({
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
