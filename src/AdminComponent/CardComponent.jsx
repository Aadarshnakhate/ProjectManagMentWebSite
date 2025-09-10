import React from "react";
import "./Dashboard.css";

function Card({ title, value, color, icon, onClick }) {
  return (
    <div className={`card ${color}`} onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="card-icon">{icon}</div>
      <div className="card-info">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}


export default Card;


