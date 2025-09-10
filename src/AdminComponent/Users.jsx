import React, { useState } from 'react';
import "./Users.css";

const TaskTable = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Test User',
      taskNo: 'T100',
      project: 'Test Project',
    },
  ]);

  // Add a new user row (you can modify this for a form later)
  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      name: 'New User',
      taskNo: `T10${users.length + 1}`,
      project: 'Default Project',
    };
    setUsers([...users, newUser]);
  };

  return (
    <div className="task-table-container">
      <h2>UsersTable</h2>

      
      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Task No</th>
            <th>Project Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5">Users are not available</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.taskNo}</td>
                <td>{user.project}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => alert(`Viewing details for ${user.name}`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;

