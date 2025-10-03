import React, { useState } from "react";
import axios from "axios";
import "./AddProject.css";

function AddProject() {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5016/api/Project/AddProject",
        formData
      );
      console.log(response );
    if (response.data.status) {
    const messageBox = document.getElementById("messageBox");
    messageBox.innerText = response.data.message;
    messageBox.style.display = "block";

    setTimeout(() => {
        window.location.reload();

    }, 2000);
}
    } catch (error) {
      console.error("❌ Error adding project:", error);
    }

    // reset
    setFormData({
      projectName: "",
      description: "",
      deadline: "",
    });
  };

  return (
    <div className="add-project-container">
  <h2 className="form-title">📌 Add New Project</h2>

  <form onSubmit={handleSubmit} className="project-form">
    <div
      id="messageBox"
      style={{ display: 'none', color: 'green', fontWeight: 'bold' }}
    >
      Project added successfully!
    </div>

    <div className="form-group">
      <label>Project Name:</label>
      <input
        type="text"
        name="projectName"
        value={formData.projectName}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label>Description:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label>Date:</label>
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        min={new Date().toISOString().split('T')[0]} // disables past dates
        required
      />
    </div>

    <button type="submit" className="submit-btn">
      ➕ Add Project
    </button>
  </form>
</div>
  );
}

export default AddProject;
