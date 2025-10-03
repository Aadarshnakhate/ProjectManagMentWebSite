import React, { useState } from "react";
import axios from "axios";
import "./AddUserTimeSheet.css";
import { useParams } from "react-router-dom";

export default function AddTimeSheet() {
  const { projectID } = useParams(); // Get projectID from URL
  const EmpId = localStorage.getItem("Id");
  const createby = localStorage.getItem("username");

  const [formData, setFormData] = useState({
    TimeSheetProjectTask: "",
    TimeSheetDescription: "",
    Date: "",
  });

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;

    const payload = {
      Task: formData.TimeSheetProjectTask,
      Description: formData.TimeSheetDescription,
      Date: new Date(formData.Date).toISOString(),
      Hours: startTime,
    };

    try {
      const res = await axios.post(
        `http://localhost:5016/api/TimeSheet/fileData?name=${EmpId}&projectID=${projectID}&createdby=${createby}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(res.data.Message || "TimeSheet added successfully.");

      // Clear the form
      setFormData({
        TimeSheetProjectTask: "",
        TimeSheetDescription: "",
        Date: "",
      });
      setHours(0);
      setMinutes(0);

      setTimeout(() =>{ setMessage("");
        navigate("/project");
      }, 3000);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to submit timesheet.");
    }
  };

  return (
    <div className="timesheet-container">
      <h2>📋 Add Timesheet</h2>

      {message && (
        <p className="message" style={{ color: "green" }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="timesheet-form">
        <label>
          Task:
          <input
            type="text"
            name="TimeSheetProjectTask"
            value={formData.TimeSheetProjectTask}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="TimeSheetDescription"
            value={formData.TimeSheetDescription}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            name="Date"
            value={formData.Date}
            onChange={handleChange}
             max={new Date().toISOString().split("T")[0]}
            required
          />
        </label>

        <label>
          Time Spent:
          <div style={{ display: "flex", gap: "5px" }}>
            {/* Hours dropdown 0–24 */}
            <select value={hours} onChange={(e) => setHours(parseInt(e.target.value, 10))}>
              {Array.from({ length: 25 }, (_, i) => (
                <option key={i} value={i}>
                  {i} h
                </option>
              ))}
            </select>

            {/* Minutes dropdown 0–59 */}
            <select value={minutes} onChange={(e) => setMinutes(parseInt(e.target.value, 10))}>
              {Array.from({ length: 60 }, (_, i) => (
                <option key={i} value={i}>
                  {i < 10 ? `0${i}` : i} m
                </option>
              ))}
            </select>
          </div>
        </label>

        <button type="submit" className="submit-btn">
          Submit Timesheet
        </button>
      </form>
    </div>
  );
}
