import React, { useState } from "react";
import "./AddProject.css";

function AddProject() {
  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    technology: "",
    expectation: "",
    description: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📌 New Project Added:", formData);

    // reset
    setFormData({
      projectName: "",
      clientName: "",
      technology: "",
      expectation: "",
      description: "",
      deadline: "",
    });
  };

  return (
    <div className="add-project-container">
      <h2 className="form-title">📌 Add New Project</h2>
      <form onSubmit={handleSubmit} className="project-form">
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
          <label>Client Name:</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Project Technology:</label>
          <input
            type="text"
            name="technology"
            value={formData.technology}
            onChange={handleChange}
            placeholder="React, .NET, SQL, etc."
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
          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
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
