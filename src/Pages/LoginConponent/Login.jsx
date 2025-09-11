import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[Role,setRole]=useState("");
  const [error, setError] = useState("");
   const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    if ((username === "admin" && password === "1234")||(username === "xyz" && password === "1231")) {
         localStorage.setItem("username", username);
      setError("");
      if(Role.toLowerCase() ==="admin")
      navigate("/DashBoard");
      else
        navigate("/UserDashBoard");

      // Add navigation or other logic here
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="page-wrapper ">
      <div className="login-containerA">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            autoComplete="off"
          />
          <div className="form-group">
          <label>Role:</label>
          <select
            name="role"
               onChange={(e) => setRole(e.target.value)} 
            required
          >
            <option value="">-- Select Role --</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
          {error && <p className="login-error">{error}</p>}
          {
            <button type="submit" className="login-button">
              Login
            </button>
          }
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
