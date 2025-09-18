import React, { useState } from "react";
import "./AddUser.css";

function AddUser() {
  const [formData, setFormData] = useState({
    Name: "",
    UserName: "",
    technology: "",
    experience: "",
    Password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📌 New User Added:", formData);

    // reset
    setFormData({
      Name: "",
      UserName: "",
      technology: "",
      experience: "",
      Password: "",
    });
  };

  return (
    <div className="add-project-container">
      <h2 className="form-title">📌 Add New User</h2>
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />

          <div className="form-group">
            <label>Role:</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            >
              <option value="">Role</option>
              <option value="0-1 years">1</option>
              <option value="1-3 years">2</option>
              <option value="3-5 years">3</option>
              <option value="5+ years">4</option>
            </select>
          </div>
          <div className="form-group">
            <label> Email:</label>
            <input
              type="text"
              name="Email"
              value={formData.UserName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add AddUser
        </button>
      </form>
    </div>
  );
}

export default AddUser;
