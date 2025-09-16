import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Table from "../tableComponent/Table.jsx";

const User = () => {
  const { projectId } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const parsedProjectId = parseInt(projectId, 10);
     
   const HandleRemove = (empId, projectId) => {
      return () => {
        const parsedProjectId = parseInt(projectId, 10);
        const parsedEmpId = parseInt(empId, 10);
        fetch(`http://localhost:5016/api/Team/removeUser/${parsedEmpId}/${parsedProjectId}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              setUsers((prevUsers) =>
                prevUsers.filter((user) => user.empId !== parsedEmpId)
              );
            }

            return res.json();
          })

          .then((data) => {
            console.log("User removed:", data);
          }

          )
          .catch((error) => {
            console.error("Error removing user:", error);
          }
          );
      };
    };

    
    alert(`Sending projectId to controller: ${parsedProjectId}`);
    fetch("http://localhost:5016/api/Team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedProjectId),
    })
      .then((res) => res.json())
      .then((fetchedData) => {
        const formattedUsers = fetchedData.map((emp) => ({
          empId: emp.empId || "N/A",
          name: emp.username || "N/A",
          action: (
            <button onClick={HandleRemove(emp.empId, parsedProjectId)}>
               remove
            </button>
          ),
        }));

        setUsers(formattedUsers);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [projectId]);

  const columns = [
    { header: "Emp ID", accessor: "empId" },
    { header: "Name", accessor: "name" },
    { header: "Action", accessor: "action" },
  ];

  return (
    <div>
      <h3>Team Members for Project {projectId}</h3>
      <Table columns={columns} data={users} Title="Users" />
    </div>
  );
};

export default User;
