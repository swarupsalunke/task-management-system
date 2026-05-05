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
      status: task.status === "completed" ? "pending" : "completed"
    });
    refresh();
  };

  // ✅ priority color
  const priorityColor =
    task.priority === "High"
      ? "danger"
      : task.priority === "Medium"
      ? "warning"
      : "success";

  return (
    <div className="card mb-3 shadow-sm">

      <div className="card-body">

        {/* Title */}
        <h5 className="card-title">{task.title}</h5>

        {/* Description */}
        <p className="card-text text-muted">{task.description}</p>

        {/* Badges */}
        <div className="mb-2">
          <span className={`badge bg-${priorityColor} me-2`}>
            {task.priority}
          </span>

          <span className="badge bg-secondary me-2">
            {task.category}
          </span>

          <span className={`badge ${task.status === "completed" ? "bg-success" : "bg-warning"}`}>
            {task.status}
          </span>
        </div>

        {/* Due date */}
        <p className="small text-muted mb-2">
          Due: {new Date(task.dueDate).toDateString()}
        </p>

        {/* Buttons */}
        <div className="d-flex gap-2">

          <button
            className="btn btn-sm btn-success"
            onClick={toggleStatus}
          >
            ✔
          </button>

          <button
            className="btn btn-sm btn-info"
            onClick={() => navigate(`/task/${task._id}`)}
          >
            👁
          </button>

          <button
            className="btn btn-sm btn-warning"
            onClick={() => navigate(`/edit/${task._id}`)}
          >
            ✏
          </button>

          <button
            className="btn btn-sm btn-danger"
            onClick={deleteTask}
          >
            🗑
          </button>

        </div>

      </div>
    </div>
  );
}

export default TaskCard;