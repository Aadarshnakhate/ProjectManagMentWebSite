import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [count, setCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const hideTimeout = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(hideTimeout.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  const handleUserLoginAlert = () => {
    alert("User Login Clicked");
  };

  const handleAdminLoginAlert = () => {
    alert("Admin Login Clicked");
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>📁 Project Management System</h1>
      </header>

      <div className="main-actions">
        <div
          className="login-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="btn login-btn">Login</button>

          {showDropdown && (
            <div className="dropdown">
              <Link
                to="/Login"
                className="dropdown-item"
                onClick={handleAdminLoginAlert}
              >
                Login
              </Link>
              {/* <button>Login</button>
              <button>Login</button> */}
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>© 2025 Project Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
