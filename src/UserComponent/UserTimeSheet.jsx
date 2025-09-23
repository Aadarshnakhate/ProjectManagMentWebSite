import Table from "../tableComponent/Table.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TimeSheetByProject = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
 const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const projectId = useParams();
  const UserName = useParams();

  const ID = parseInt(projectId.projectID, 10);

  const columns = [
    { header: " Name", accessor: "UserName" },
    { header: "Project Name", accessor: "projectName" },
    { header: "Task", accessor: "task" },
    { header: "Project Description", accessor: "projectdescription" },

    { header: "Date", accessor: "date" },
    { header: "Time", accessor: "hours" },
    { header: "Action", accessor: "action" },
  ];

  const navigate = useNavigate();
  const handleEditTimeSheet = (timeSheetId) => {
    console.log(timeSheetId);
    navigate("/EditTimeSheet/" + timeSheetId, {
      state: { timeSheetId },
    });
  };

  const handleTimeSheetDelete = async (timeSheetId) => {
    try{const res = await axios.delete(
      `http://localhost:5016/Delete?TimeSheetId=${timeSheetId}`
    
    );
    console.log(res);
     if (res.status === 200) {
        setMessage("Your Data was successfully deleted!");
        setMessageColor("green");
      } else {
        setMessage("Something went wrong!");
        setMessageColor("red");
      }
    }
      catch (error) {
        console.error("Error fetching project data:", error);
      
    }
  };
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5016/projectId?projectID=${ID}&name=${UserName.username}`,
          null,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("Data", response.data);
        const mappedData = response.data.map((TimeSheet) => ({
          timeSheetId: TimeSheet.timeSheetId,
          UserName: TimeSheet.userName,
          task: TimeSheet.timeSheetProjectTask,
          projectName: TimeSheet.projectName,

          projectdescription: TimeSheet.timeSheetDescription,

          date: new Date(TimeSheet.date).toLocaleDateString(),
          hours: TimeSheet.hours,

          action: (
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => handleEditTimeSheet(TimeSheet.timeSheetId)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#1D4ED8", // blue
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleTimeSheetDelete(TimeSheet.timeSheetId)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#DC2626", // red
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ),
        }));

        setData(mappedData);
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [projectId]);

  return (
    <div>
      message && (
  <p style={{ 
      color: messageColor, 
      margin: "10px 0", 
      fontWeight: "bold" 
  }}>
    {message}
  </p>
)
      <h3>Project Overview </h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          columns={columns}
          data={data}
          Title=" TimeSheet By Project"
          backPath="/UserDashBoard"
        />
      )}
    </div>
  );
};

export default TimeSheetByProject;
