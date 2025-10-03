import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditTimeSheet() {
  const { timeSheetId } = useParams();
  const id = parseInt(timeSheetId, 10);
  const navigate = useNavigate();
  const { state } = useLocation();

  // Form state
  const [form, setForm] = useState({
    projectName: "",
    description: "",
    deadline: "",
  });

  // Hours and minutes state
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  // Message state
  const [message, setMessage] = useState("");

  // Autofill old data
  useEffect(() => {
    const loadTimeSheet = async () => {
      try {
        let data;

        if (state) {
          data = state;
        } else {
          const res = await axios.get(
            `http://localhost:5016/api/TimeSheet/GetTimeSheetById/${id}`
          );
          data = res.data;
        }

        setForm({
          projectName: data.TimeSheetProjectTask || "",
          description: data.TimeSheetDescription || "",
          deadline: data.Date ? data.Date.split("T")[0] : "",
        });

        // Handle time
        if (data.hours !== undefined) {
          const h = Math.floor(data.hours);
          const m = Math.round((data.hours - h) * 60);
          setHours(h);
          setMinutes(m);
        } else if (data.StartTime) {
          const [h, m] = data.StartTime.split(":").map((x) => parseInt(x, 10));
          setHours(h);
          setMinutes(m);
        }
      } catch (error) {
        console.error("Error loading timesheet:", error);
        setMessage("Failed to load timesheet.");
      }
    };

    loadTimeSheet();
  }, [id, state]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.projectName || !form.description || !form.deadline) {
      setMessage("All fields are required.");
      return;
    }

    const startTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:00`;

    try {
  const response = await axios.put(
  `http://localhost:5016/api/TimeSheet/UpdateTimeSheet?TimeSheetId=${id}`,
  {
    TimeSheetProjectTask: form.projectName,
    TimeSheetDescription: form.description,
    Date: form.deadline,
    StartTime: startTime, // string
  }
);
      setMessage(response.data.Message || "TimeSheet updated successfully.");

      // Redirect after 2 seconds
     
        navigate("/project");
   
    } catch (error) {
      console.error("Error updating timesheet:", error);
      setMessage("Failed to update timesheet. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Edit TimeSheet</h2>

      {message && (
        <div style={{ color: "green", marginBottom: "10px" }}>{message}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Task</label>
          <input
            type="text"
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
            maxLength={100}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            maxLength={500}
            required
            style={{ width: "100%", padding: "8px", height: "100px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Date</label>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            required
               max={new Date().toISOString().split("T")[0]}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Time (Hours & Minutes)</label>
          <div style={{ display: "flex", gap: "5px" }}>
            <select value={hours} onChange={(e) => setHours(parseInt(e.target.value))}>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>

            <select value={minutes} onChange={(e) => setMinutes(parseInt(e.target.value))}>
              {Array.from({ length: 60 }, (_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="button" onClick={() => navigate("/project")}>
            Cancel
          </button>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
