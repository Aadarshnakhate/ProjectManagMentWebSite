import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // 👈 import jwt-decode

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5016/api/Users/LoginCredaintial",
        {
          Username: username,
          Password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.token) {
        const decoded = jwtDecode(response.data.token);

        const userRole =
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];

        const Name =
          decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

        const empId = decoded["EmpId"];

        localStorage.setItem("username", Name);
        localStorage.setItem("Role", userRole);
        localStorage.setItem("Id", empId);
        console.log("EmpId from login page",empId);
        localStorage.setItem("token", response.data.token);

        if (userRole && userRole.toLowerCase() === "admin") {
          navigate("/DashBoard");
        } else {
          navigate("/UserDashBoard");
        }
      } else {
        setResponseMsg(
          response.data.message || "Login failed: No token received"
        );
        setError(true);
      }
    } catch (error) {
      setResponseMsg(
        error.response?.data?.message || "Login failed: Server error"
      );
      setError(true);
    }
  };

  return (
    <div className="page-wrapper">
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
          {error && <p className="login-error">{responseMsg}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
