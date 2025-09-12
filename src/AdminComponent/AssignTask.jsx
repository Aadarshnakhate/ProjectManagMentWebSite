import React from "react";
import "./AssignTask.css";

function AssignTask() {
  return (
    <div className="assign-task-container">
      <div className="assign-task-card">
        <h2 className="assign-task-title">Assign New Task</h2>
        <form>
          <label>
            Select Project:
            <select className="assign-task-input" defaultValue="">
              <option value="" disabled>
                -- Choose Project --
              </option>
              <option value="project1">Project 1</option>
              <option value="project2">Project 2</option>
            </select>
          </label>

          <label>
            Assign To User:
            <select className="assign-task-input" defaultValue="">
              <option value="" disabled>
                -- Choose User --
              </option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
            </select>
          </label>

          <label>
            Task Title:
            <input
              type="text"
              placeholder="Enter task title"
              className="assign-task-input"
            />
          </label>

          <label>
            Description:
            <textarea
              rows="4"
              placeholder="Task description"
              className="assign-task-input"
            />
          </label>

          <label>
            Deadline:
            <input type="date" className="assign-task-input" />
          </label>

          <button type="submit" className="assign-task-button">
            Assign Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AssignTask;
