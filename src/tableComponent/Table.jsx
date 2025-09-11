import React from "react";
import "./Table.css";
import { useNavigate } from "react-router-dom";

// ✅ Rename to 'Table' instead of 'TaskTable'
const Table = ({ columns, data,Title }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/DashBoard");
  };

  return (
    <div className="task-table-container">
      <button className="back-btn" onClick={handleBack}>
        ← Back
      </button>
      <h2>{Title}</h2>

      <table className="task-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>Users are not available</td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col.accessor}>{row[col.accessor]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
