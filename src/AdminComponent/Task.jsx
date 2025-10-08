import React, { useEffect, useState } from "react";
import Table from "../tableComponent/Table.jsx";
import axios from "axios";

const Task = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userFilter, setUserFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState(""); // 1-12
  const [totalHours, setTotalHours] = useState(0);

  const columns = [
    { header: "Name", accessor: "UserName" },
    { header: "Project Name", accessor: "projectName" },
    { header: "Task", accessor: "task" },
    { header: "Description", accessor: "projectdescription" },
    { header: "Date", accessor: "date" },
    { header: "Hours", accessor: "hours" },
  ];

  const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  // Fetch filtered data from backend
  const fetchTasks = async () => {
    try {
      const params = {
        userName: userFilter || undefined,
        projectName: projectFilter || undefined,
        year: yearFilter || undefined,
        month: monthFilter || undefined,
      };

      const response = await axios.get("http://localhost:5016/api/TimeSheet/All", { params });

      const formattedData = response.data.map(task => {
        let hours = task.hours;
        console.log("Raw hours:", hours);
        if (typeof hours === "string" && hours.includes(":")) {
          const [h, m] = hours.split(":").map(x => parseFloat(x));
          hours = h + (m / 60); 
        } else {
          hours = parseFloat(hours) || 0;
        }

        return {
          taskId: task.timeSheetId,
          UserName: task.emp_Name,
          projectName: task.projectName,
          task: task.timeSheetProjectTask,
          projectdescription: task.timeSheetDescription,
          date: new Date(task.date),
          hours,
        };
      });

      setAllData(formattedData);
      setFilteredData(formattedData);
    const totalDecimalHours = formattedData.reduce((sum, item) => sum + item.hours, 0);

// Separate hours and minutes
const hours = Math.floor(totalDecimalHours);
const minutes = Math.round((totalDecimalHours - hours) * 60);

// If minutes reach 60, carry over to hours
const finalHours = hours + Math.floor(minutes / 60);
const finalMinutes = minutes % 60;

// Format as HH.MM
const formattedTotal = Number(`${finalHours}.${finalMinutes.toString().padStart(2, '0')}`);

setTotalHours(formattedTotal);
      console.log("Formatted Data:", formattedData);
      console.log("Total Hours:", totalHours);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userFilter, projectFilter, yearFilter, monthFilter]);

  // Unique filter options
  const users = Array.from(new Set(allData.map(d => d.UserName))).sort();
  const projects = Array.from(new Set(allData.map(d => d.projectName))).sort();
  const years = Array.from(new Set(allData.map(d => new Date(d.date).getFullYear()))).sort((a, b) => b - a);

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ marginBottom: "15px" }}>TimeSheet</h3>

      {/* Filters */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <select value={userFilter} onChange={(e) => setUserFilter(e.target.value)}>
          <option value="">All Users</option>
          {users.map(user => <option key={user} value={user}>{user}</option>)}
        </select>

        <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
          <option value="">All Projects</option>
          {projects.map(project => <option key={project} value={project}>{project}</option>)}
        </select>

        <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
          <option value="">All Years</option>
          {years.map(year => <option key={year} value={year}>{year}</option>)}
        </select>

        {/* Month Filter with Names */}
        <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
          <option value="">All Months</option>
          {monthNames.map((month, index) => (
            <option key={index} value={index + 1}>{month}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredData.map(d => ({
          ...d,
          date: d.date instanceof Date ? d.date.toLocaleDateString() : d.date
        }))}
        Title="TimeSheet"
        backPath="/DashBoard"
        totalHours={totalHours}
      />
    </div>
  );
};

export default Task;
