import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

function Home() {
  const [count, setCount] = useState(0);
 
  const hideTimeout = useRef(null);
 
    const navigate = useNavigate();

  const showlogin = () => {
  navigate("/Login");
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>📁 Project Management System</h1>
      </header>

      <div className="main-actions">
        <div
          className="login-container"
          
        >
          <button className="btn login-btn" onClick={showlogin}>
            Login
          </button>
        </div>
      </div>

      <footer className="footer">
        <p>© 2025 Project Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
