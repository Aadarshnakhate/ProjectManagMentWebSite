import React from "react";
import "./Table.css";
import { useNavigate } from "react-router-dom";

const Table = ({ columns, data, Title, backPath = "/DashBoard" ,totalHours }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(backPath);
  };

  return (
    <div className="task-table-container">
      <button className="back-btn-B" onClick={handleBack}>
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
            ) )
          )}
        
        </tbody>
       {/* Footer with totalHours */}
  {totalHours !== undefined && totalHours !== null &&  data.length !== 0 && (
    <tfoot>
      <tr>
        <td colSpan={columns.length} style={{ textAlign: "right", fontWeight: "bold", padding: "10px" }}>
          Total Hours: {totalHours}
        </td>
      </tr>
    </tfoot>
  )}
      </table>
      
    </div>
  );
};

export default Table;
