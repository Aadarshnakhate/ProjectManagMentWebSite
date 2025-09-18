import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditProject.css";

export default function EditProject() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: state?.id || "",
    projectName: state?.projectName || "",
    description: state?.description || "",
    deadline: state?.deadline ? state.deadline.split("T")[0] : "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "projectName" && value.length > 100) return;
    if (name === "description" && value.length > 500) return;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.projectName || !form.description || !form.deadline) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5016/api/Project/EditProject`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: form.id,
            projectName: form.projectName,
            description: form.description,
            deadline: form.deadline,
          }),
        }
      );

      if (response.ok) {
        setMessage("Project updated successfully.");
        setTimeout(() => navigate("/project"), 1500);
      } else {
        const errorText = await response.text();
        setMessage(`Update failed: ${errorText}`);
      }
    } catch (error) {
      console.error("Error updating project:", error);
      setMessage("Server error while updating project.");
    }
  };

  return (
     <div
  className="edit-project-container"
  style={{ padding: "20px", width:"700",maxWidth: "600px", margin: "auto" }}
>
      <h2>Edit Project</h2>
      {message && (
        <div style={{ marginBottom: "10px", color: "red" }}>{message}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name</label>
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
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "20px" }}
          />
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
