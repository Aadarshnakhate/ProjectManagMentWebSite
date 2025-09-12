import React, { useEffect, useState } from "react";
import axios from "axios";

function UsersList() {
  const [users, setUsers] = useState([]); // Array of objects

  useEffect(() => {
    axios.get("https://localhost:7030/api/Users/show",{
     withCredentials: true})
      .then(response => {
        // Yaha array of objects aayega
        setUsers(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      
      {users.length > 0 ? (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
}

export default UsersList;