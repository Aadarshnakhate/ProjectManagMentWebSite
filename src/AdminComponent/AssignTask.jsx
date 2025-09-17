import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaProjectDiagram, FaSave, FaArrowLeft, FaSearch, FaCheckCircle } from 'react-icons/fa';
import './AssignTask.css';

export default function AssignTaskToNewUser() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    projectId: state?.id || '',
    projectName: state?.projectName || '',
    description: state?.description || '',
    deadline: state?.deadline || '',
    selectedUser: ''
  });

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
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5016/api/User/Users');
      if (response.ok) {
        const userData = await response.json();
        setUsers(userData);
        setFilteredUsers(userData);
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

      if (response.ok) {
        setMessage({ type: 'success', text: 'Project assigned successfully!' });
        setTimeout(() => {
          navigate('/project');
        }, 2000);
      } else {
        const errorData = await response.text();
        setMessage({ type: 'error', text: errorData || 'Failed to assign project' });
      }
    } catch (error) {
      console.error('Error assigning project:', error);
      setMessage({ type: 'error', text: 'Error connecting to server' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/project');
  };

  return (
    <div className="assign-project-container">
      <div className="assign-project-header">
        <button className="back-btn" onClick={handleBack}>
          <FaArrowLeft />
          Back to Projects
        </button>
        <h1>Assign Project to User</h1>
      </div>

      <div className="assign-project-content">
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
            <FaUser className="card-icon" />
            <h2>Assign to User</h2>
          </div>

          <form onSubmit={handleSubmit} className="assignment-form">
            <div className="form-group">
              <label htmlFor="userSearch">Select User:</label>
              <div className="user-search-container">
                <div className="search-input-wrapper">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    id="userSearch"
                    placeholder="Search users by username or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="user-search-input"
                  />
                </div>
                
                {searchTerm && (
                  <div className="user-dropdown">
                    {loading ? (
                      <div className="loading-item">Loading users...</div>
                    ) : filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className={`user-item ${form.selectedUser === user.username ? 'selected' : ''}`}
                          onClick={() => handleUserSelect(user)}
                        >
                          <div className="user-info">
                            <div className="user-name">{user.username}</div>
                            {user.email && <div className="user-email">{user.email}</div>}
                          </div>
                          {form.selectedUser === user.username && (
                            <FaCheckCircle className="selected-icon" />
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="no-results">No users found</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {form.selectedUser && (
              <div className="selected-user-display">
                <FaUser className="selected-user-icon" />
                <span>Selected: <strong>{form.selectedUser}</strong></span>
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