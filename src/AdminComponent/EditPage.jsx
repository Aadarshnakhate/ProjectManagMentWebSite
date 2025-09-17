import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaProjectDiagram, FaSave, FaArrowLeft, FaSearch, FaCheckCircle, FaUsers } from 'react-icons/fa';
import './EditPage.css';

export default function EditPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    projectId: state?.id || '',
    projectName: state?.projectName || '',
    description: state?.description || '',
    deadline: state?.deadline || '',
    selectedUser: ''
  });

  // Debug: Log the state data when component mounts
  useEffect(() => {
    console.log('EditPage mounted with state:', state);
    console.log('Project ID from state:', state?.id);
    console.log('Project ID type:', typeof state?.id);
  }, []);

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5016/api/Team/Not');
      if (response.ok) {
        const userData = await response.json();
        setUsers(userData);
        setFilteredUsers(userData);
      } else if (response.status === 404) {
        setMessage({ type: 'info', text: 'No users available for project assignment' });
        setUsers([]);
        setFilteredUsers([]);
      } else {
        setMessage({ type: 'error', text: 'Failed to fetch users' });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage({ type: 'error', text: 'Error connecting to server' });
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    setForm(prev => ({ ...prev, selectedUser: user.username }));
    setSearchTerm(user.username);
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.selectedUser) {
      setMessage({ type: 'error', text: 'Please select a user to assign the project to' });
      return;
    }

    if (!form.projectId || form.projectId === '') {
      setMessage({ type: 'error', text: 'Project ID is missing. Please go back and try again.' });
      return;
    }

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const url = `http://localhost:5016/api/Team/AssignProject?name=${encodeURIComponent(form.selectedUser)}`;
      console.log('Making request to:', url);
      console.log('Selected user:', form.selectedUser);
      console.log('Project ID:', form.projectId);
      console.log('Project ID type:', typeof form.projectId);

      // Ensure projectId is a valid integer
      const projectId = parseInt(form.projectId);
      if (isNaN(projectId)) {
        setMessage({ type: 'error', text: 'Invalid project ID' });
        setSubmitting(false);
        return;
      }

      console.log('Parsed Project ID:', projectId);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectId)
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const successData = await response.text();
        console.log('Success response:', successData);
        setMessage({ type: 'success', text: successData || 'Project assigned successfully!' });
        setTimeout(() => {
          navigate('/project');
        }, 2000);
      } else {
        const errorData = await response.text();
        console.log('Error response:', errorData);
        console.log('Response status:', response.status);
        setMessage({ type: 'error', text: errorData || `Failed to assign project (Status: ${response.status})` });
      }
    } catch (error) {
      console.error('Error assigning project:', error);
      setMessage({ type: 'error', text: `Error connecting to server: ${error.message}` });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/project');
  };

  return (
    <div className="edit-page-container">
      <div className="edit-page-header">
        <button className="back-btn" onClick={handleBack}>
          <FaArrowLeft />
          Back to Projects
        </button>
        <h1>Assign Project to Employee</h1>
      </div>

      <div className="edit-page-content">
        {/* Project Information Card */}
        <div className="project-info-card">
          <div className="card-header">
            <FaProjectDiagram className="card-icon" />
            <h2>Project Information</h2>
          </div>
          <div className="project-details">
            <div className="detail-item">
              <label>Project ID:</label>
              <span>{form.projectId}</span>
            </div>
            <div className="detail-item">
              <label>Project Name:</label>
              <span>{form.projectName}</span>
            </div>
            <div className="detail-item">
              <label>Description:</label>
              <span>{form.description}</span>
            </div>
            <div className="detail-item">
              <label>Deadline:</label>
              <span>{form.deadline ? new Date(form.deadline).toLocaleDateString() : 'Not set'}</span>
            </div>
          </div>
        </div>

        {/* Assignment Form */}
        <div className="assignment-form-card">
          <div className="card-header">
            <FaUsers className="card-icon" />
            <h2>Assign to Employee</h2>
          </div>

          <form onSubmit={handleSubmit} className="assignment-form">
            <div className="form-group">
              <label htmlFor="userSearch">Select Employee:</label>
              <div className="user-search-container">
                <div className="search-input-wrapper">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    id="userSearch"
                    placeholder="Search employees by username or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="user-search-input"
                  />
                </div>
                
                {searchTerm && (
                  <div className="user-dropdown">
                    {loading ? (
                      <div className="loading-item">Loading employees...</div>
                    ) : filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
                        <div
                          key={index}
                          className={`user-item ${form.selectedUser === user.username ? 'selected' : ''}`}
                          onClick={() => handleUserSelect(user)}
                        >
                          <div className="user-info">
                            <div className="user-name">{user.username}</div>
                            <div className="user-status">Available for assignment</div>
                          </div>
                          {form.selectedUser === user.username && (
                            <FaCheckCircle className="selected-icon" />
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="no-results">No employees found</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {form.selectedUser && (
              <div className="selected-user-display">
                <FaUser className="selected-user-icon" />
                <span>Selected Employee: <strong>{form.selectedUser}</strong></span>
              </div>
            )}

            {message.text && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleBack}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="assign-btn"
                disabled={submitting || !form.selectedUser}
              >
                {submitting ? (
                  <>
                    <div className="spinner"></div>
                    Assigning...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Assign Project
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}