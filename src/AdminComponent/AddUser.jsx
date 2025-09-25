import React, { useState } from "react";
import "./AddUser.css";
import axios from "axios";

function AddUser() {
  const [formData, setFormData] = useState({
    emp_Name: "",
    emp_Email: "",
    emp_Role: "", // will convert to int
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      emp_Role: name === "emp_Role" ? parseInt(value) : formData.emp_Role,
      [name]: name === "emp_Role" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5016/api", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ User added:", response.data);

      setFormData({ emp_Name: "", emp_Email: "", emp_Role: "" });
    } catch (error) {
      console.error("❌ Error adding user:", error);
    }
  };

  return (
    <div className="add-project-container">
      <h2 className="form-title">📌 Add New User</h2>
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="emp_Name"
            value={formData.emp_Name}
            onChange={handleChange}
            required
          />

          <label>Role:</label>
          <select
            name="emp_Role"
            value={formData.emp_Role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value={1}>Admin</option>
            <option value={2}>User</option>
            <option value={3}>Manager</option>
          </select>

          <label>Email:</label>
          <input
            type="text"
            name="emp_Email"
            value={formData.emp_Email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;
