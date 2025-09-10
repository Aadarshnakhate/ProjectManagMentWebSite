import React, { useState } from "react";
import "./AddUser.css";

function AddUser() {
  const [formData, setFormData] = useState({
    Name: "",
    UserName: "",
    technology: "",
    experience: "",
    Password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📌 New User Added:", formData);
    alert("✅ Project Added Successfully!");

    // reset
    setFormData({
      Name: "",
      UserName: "",
      technology: "",
      experience: "",
      Password: ""
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
          <label>Technology:</label>
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
  <label>Experience:</label>
  <select
    name="experience"
    value={formData.experience}
    onChange={handleChange}
    required
  >
    <option value="">-- Select Experience --</option>
    <option value="0-1 years">0-1 years</option>
    <option value="1-3 years">1-3 years</option>
    <option value="3-5 years">3-5 years</option>
    <option value="5+ years">5+ years</option>
  </select>
</div>
        <div className="form-group">
          <label>username:</label>
          <input
            type="text"
            name="UserName"
            value={formData.UserName}
            onChange={handleChange}
            required
          />
        </div>
        </div>
     
          <div className="form-group">
          <label>Password (Optional):</label>
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />
        </div>
       

     

       

        <button type="submit" className="submit-btn">
          ➕ Add AddUser
        </button>
      </form>
    </div>
  );
}

export default AddUser;
