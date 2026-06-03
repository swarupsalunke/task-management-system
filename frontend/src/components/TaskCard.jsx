import { useNavigate } from "react-router-dom";
import API from "../services/api";

function TaskCard({ task, refresh }) {
  const navigate = useNavigate();

  const deleteTask = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    await API.delete(`/tasks/${task._id}`);
    refresh();
  };

  const toggleStatus = async () => {
    await API.put(`/tasks/${task._id}`, {
      status: task.status === "completed" ? "pending" : "completed",
    });
    refresh();
  };

  const priorityClass = {
    High:   "tc-badge-high",
    Medium: "tc-badge-med",
    Low:    "tc-badge-low",
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

  return (
    <div className="task-card">

      {/* Title + Status */}
      <div className="tc-top">
        <h5 className="tc-title">{task.title}</h5>
        <span className={`tc-status ${task.status === "completed" ? "tc-status-done" : "tc-status-pending"}`}>
          <i className={`ti ${task.status === "completed" ? "ti-circle-check" : "ti-clock"}`} aria-hidden="true"></i>
          {task.status}
        </span>
      </div>

      {/* Description */}
      <p className="tc-desc">{task.description}</p>

      {/* Badges */}
      <div className="tc-badges">
        <span className={`tc-badge ${priorityClass[task.priority] || "tc-badge-low"}`}>
          <i className="ti ti-flag" aria-hidden="true"></i>
          {task.priority}
        </span>
        <span className="tc-badge tc-badge-cat">
          <i className="ti ti-tag" aria-hidden="true"></i>
          {task.category}
        </span>
      </div>

      {/* Due date */}
      <div className="tc-date">
        <i className="ti ti-calendar" aria-hidden="true"></i>
        {formatDate(task.dueDate)}
      </div>

      {/* Action buttons */}
      <div className="tc-actions">
        <button
          className="tc-act tc-act-check"
          title={task.status === "completed" ? "Mark Pending" : "Mark Complete"}
          onClick={toggleStatus}
        >
          <i className="ti ti-check" aria-hidden="true"></i>
        </button>

        <button
          className="tc-act tc-act-view"
          title="View Details"
          onClick={() => navigate(`/task/${task._id}`)}
        >
          <i className="ti ti-eye" aria-hidden="true"></i>
        </button>

        <button
          className="tc-act tc-act-edit"
          title="Edit Task"
          onClick={() => navigate(`/edit/${task._id}`)}
        >
          <i className="ti ti-edit" aria-hidden="true"></i>
        </button>

        <button
          className="tc-act tc-act-del"
          title="Delete Task"
          onClick={deleteTask}
        >
          <i className="ti ti-trash" aria-hidden="true"></i>
        </button>
      </div>

    </div>
  );
}

export default TaskCard;