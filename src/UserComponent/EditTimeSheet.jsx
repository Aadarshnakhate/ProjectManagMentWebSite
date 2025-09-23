import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditTimeSheet.css";

export default function EditProject() {
  const { state } = useLocation();
  const navigate = useNavigate();
const {  timeSheetId } = useParams();
const id = parseInt(timeSheetId, 10);
console.log("reaceivedID" ,id);//here ir is NaN shows why

  // Hours and minutes state
  const [hours, setHours] = useState(state?.hours || 0);
  const [minutes, setMinutes] = useState(state?.minutes || 0);

  // Form state
  const [form, setForm] = useState({
    projectName: state?.projectName || "",
    description: state?.description || "",
    deadline: state?.deadline ? state.deadline.split("T")[0] : "",
  });

  const [message, setMessage] = useState("");

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "projectName" && value.length > 100) return;
    if (name === "description" && value.length > 500) return;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.projectName || !form.description || !form.deadline) {
      setMessage("All fields are required.");
      return;
    }

    // Format startTime as HH:mm:ss
    const startTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:00`;

    try {
      await axios.put(`http://localhost:5016/UpdateTimeSheet?TimeSheetId=${id}`, {
  TimeSheetProjectTask: form.projectName,
  TimeSheetDescription: form.description,
  Date: form.deadline,
  StartTime: startTime,
});
      console.log("Response:", response.data);
      navigate("/project"); // Redirect after success
    } catch (error) {
      console.error("Error updating timesheet:", error);
    }
  };

  return (
    <div
      className="edit-project-container"
      style={{ padding: "20px", width: "700px", maxWidth: "600px", margin: "auto" }}
    >
      <h2>Edit TimeSheet</h2>
      {message && <div style={{ marginBottom: "10px", color: "red" }}>{message}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Task</label>
          <input
            type="text"
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
            maxLength={100}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            maxLength={500}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              height: "100px",
            }}
          />
        </div>

        <div>
          <label>Date</label>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
          />
        </div>

        <div>
          <label>Time (Hours & Minutes)</label>
          <div
            style={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              height: "35px",
              marginBottom: "15px",
            }}
          >
            <select value={hours} onChange={(e) => setHours(parseInt(e.target.value))}>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>

            <select value={minutes} onChange={(e) => setMinutes(parseInt(e.target.value))}>
              {Array.from({ length: 60 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
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
