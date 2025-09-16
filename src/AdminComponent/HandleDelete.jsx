import axios from 'axios';

const HandleDelete = async (projectName) => {
  try {
    await axios.delete(`http://localhost:5016/api/Project/DeleteProject/${projectName}`)
    console.log("Project deleted successfully!");
  } catch (error) {
    console.error("Delete failed:", error.response?.data || error.message);
  }
};
export default HandleDelete;