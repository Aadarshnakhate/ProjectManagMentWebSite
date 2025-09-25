import React, { useState } from "react";
import axios from "axios";
import "./AddUserTimeSheet.css";
import { useParams } from "react-router-dom";

export default function AddTimeSheet() {
  const { projectID } = useParams(); // Get projectID from URL
  // const numericName = 22; // Hardcoded name
  const EmpId = localStorage.getItem("Id");
  const createby = localStorage.getItem("username");
  console.log(createby);
  console.log(EmpId);
  const [formData, setFormData] = useState({
    TimeSheetProjectTask: "",
    TimeSheetDescription: "",
    Date: "",
    Hours: "", // will always send as string
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If Hours, force it to string
    if (name === "Hours") {
      setFormData((prev) => ({ ...prev, [name]: value.toString() }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Task: formData.TimeSheetProjectTask,
      Description: formData.TimeSheetDescription,
  Date: new Date(formData.Date).toISOString(),
      Hours: formData.Hours, // always string
    };

    try {
      await axios.post(
        `http://localhost:5016/fileData?name=${EmpId}&projectID=${projectID}&createdby=${createby}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage("✅ Timesheet submitted successfully!");
      setFormData({
        TimeSheetProjectTask: "",
        TimeSheetDescription: "",
        Date: "",
        Hours: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to submit timesheet.");
    }
  };

  return (
    <div className="timesheet-container">
      <h2>📋 Add Timesheet</h2>
      {message && <p className="message">{message}</p>}
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
            required
          />
        </label>

        <label>
          Hours Spent:
          <input
            type="number"
            name="Hours"
            value={formData.Hours}
            onChange={handleChange}
            min="0"
            max="24"
            step="0.25"
            placeholder="Enter hours spent"
            required
          />
        </label>

        <button type="submit" className="submit-btn">
          Submit Timesheet
        </button>
      </form>
    </div>
  );
}
