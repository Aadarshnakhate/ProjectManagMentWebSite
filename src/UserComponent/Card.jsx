import React from "react";
import "./Card.css";

function Card({ title, value, color, icon, onclick, subtitle }) {
  return (
    <div className={`card ${color}`} onClick={onclick}>
      <div className="card-icon">{icon}</div>
      <div className="card-info">
        <h3>{title}</h3>
        <p className="card-value">{value}</p>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}

export default Card;
