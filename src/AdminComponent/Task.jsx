import React, { useEffect, useState } from "react";
import Table from "../tableComponent/Table.jsx";
import axios from "axios";

const Task = () => {
  const [allData, setAllData] = useState([]); // Full data from API
  const [filteredData, setFilteredData] = useState([]); // Data after filters
  const [userFilter, setUserFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState(""); // 1,3,6
  const [totalHours, setTotalHours] = useState(0);

  const columns = [
    { header: "Name", accessor: "UserName" },
    { header: "Project Name", accessor: "projectName" },
    { header: "Task", accessor: "task" },
    { header: "Description", accessor: "projectdescription" },
    { header: "Date", accessor: "date" },
    { header: "Hours", accessor: "hours" },
  ];

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5016/api/TimeSheet/All");

      // Format data
      const formattedData = response.data.map((task) => {
        let hours = task.hours;
        if (typeof hours === "string" && hours.includes(":")) {
          const [h, m] = hours.split(":").map((x) => parseFloat(x));
          hours = h + (0.1 * m);
        } else {
          hours = parseFloat(hours);
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
      setTotalHours(formattedData.reduce((sum, item) => sum + item.hours, 0));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter data whenever a filter changes
  useEffect(() => {
    let data = allData;

    if (userFilter) data = data.filter(d => d.UserName === userFilter);
    if (projectFilter) data = data.filter(d => d.projectName === projectFilter);
    if (yearFilter) data = data.filter(d => new Date(d.date).getFullYear() === Number(yearFilter));
    if (monthFilter) data = data.filter(d => {
      const monthsAgo = Number(monthFilter);
      const cutoff = new Date();
      cutoff.setMonth(cutoff.getMonth() - monthsAgo);
      return new Date(d.date) >= cutoff;
    });

    setFilteredData(data);
    setTotalHours(data.reduce((sum, item) => sum + item.hours, 0));
  }, [userFilter, projectFilter, yearFilter, monthFilter, allData]);

  const users = Array.from(new Set(filteredData.map(d => d.UserName)));
  const projects = Array.from(new Set(filteredData.map(d => d.projectName)));
  const years = Array.from(new Set(filteredData.map(d => new Date(d.date).getFullYear()))).sort((a,b) => b - a);

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

        <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
          <option value="">All Months</option>
          <option value="1">Last 1 Month</option>
          <option value="3">Last 3 Months</option>
          <option value="6">Last 6 Months</option>
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
