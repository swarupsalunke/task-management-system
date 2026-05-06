import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function TaskCard({ task, refresh }) {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [toggling, setToggling] = useState(false);

  const deleteTask = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      toast.warn(
        <div>
          <p className="mb-2 fw-semibold">Delete this task?</p>
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-danger"
              onClick={async () => {
                toast.dismiss();
                try {
                  await API.delete(`/tasks/${task._id}`);
                  toast.success("Task deleted ✓");
                  refresh();
                } catch {
                  toast.error("Failed to delete task ❌");
                }
              }}
            >
              Yes, delete
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => { toast.dismiss(); setConfirmDelete(false); }}
            >
              Cancel
            </button>
          </div>
        </div>,
        { autoClose: false, closeOnClick: false, draggable: false }
      );
      return;
    }
  };

  const toggleStatus = async () => {
    setToggling(true);
    try {
      await API.put(`/tasks/${task._id}`, {
        status: task.status === "completed" ? "pending" : "completed",
      });
      toast.success(
        task.status === "completed"
          ? "Marked as pending ↩️"
          : "Task completed 🎉"
      );
      refresh();
    } catch {
      toast.error("Failed to update status ❌");
    } finally {
      setToggling(false);
    }
  };

  const priorityColor =
    task.priority === "High"
      ? { bg: "#2a0a0a", text: "#ff6b6b", border: "#3d1414" }
      : task.priority === "Medium"
      ? { bg: "#2a1f00", text: "#f5a623", border: "#3d2e00" }
      : { bg: "#0a2a1a", text: "#00D2B4", border: "#143d28" };

  const isCompleted = task.status === "completed";

  // Check overdue
  const isOverdue =
    !isCompleted && task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div
      className="rounded-4 p-3 mb-3"
      style={{
        background: "#141414",
        border: "1px solid #2a2a2a",
      }}
    >
      {/* Top row — title + status toggle */}
      <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
        <h6
          className="fw-semibold mb-0"
          style={{
            color: isCompleted ? "#555" : "#fff",
            textDecoration: isCompleted ? "line-through" : "none",
          }}
        >
          {task.title}
        </h6>

        {/* Toggle button */}
        <button
          className="btn btn-sm border-0 rounded-3 flex-shrink-0"
          onClick={toggleStatus}
          disabled={toggling}
          style={
            isCompleted
              ? { background: "#0a2a1a", color: "#00D2B4" }
              : { background: "#1f1f1f", color: "#888" }
          }
          title={isCompleted ? "Mark as pending" : "Mark as completed"}
        >
          {toggling ? (
            <span className="spinner-border spinner-border-sm" />
          ) : isCompleted ? (
            "✓ Done"
          ) : (
            "○ Pending"
          )}
        </button>
      </div>

      {/* Description */}
      {task.description && (
        <p
          className="small mb-2"
          style={{
            color: "#888",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {task.description}
        </p>
      )}

      {/* Badges row */}
      <div className="d-flex flex-wrap gap-2 mb-2">
        {/* Priority */}
        <span
          className="badge rounded-pill small fw-semibold"
          style={{
            background: priorityColor.bg,
            color: priorityColor.text,
            border: `1px solid ${priorityColor.border}`,
          }}
        >
          {task.priority}
        </span>

        {/* Category */}
        <span
          className="badge rounded-pill small fw-semibold"
          style={{
            background: "#1f1f1f",
            color: "#aaa",
            border: "1px solid #2a2a2a",
          }}
        >
          {task.category}
        </span>

        {/* Due date */}
        <span
          className="badge rounded-pill small fw-semibold"
          style={{
            background: isOverdue ? "#2a0a0a" : "#1a1f2a",
            color: isOverdue ? "#ff6b6b" : "#4F8EF7",
            border: `1px solid ${isOverdue ? "#3d1414" : "#1e2d4a"}`,
          }}
        >
          {isOverdue ? "⚠ " : ""}Due {new Date(task.dueDate).toDateString()}
        </span>
      </div>

      {/* Action buttons */}
      <div className="d-flex gap-2 mt-3">
        <button
          className="btn btn-sm rounded-3 fw-semibold flex-fill border-0"
          style={{ background: "#1a1f2a", color: "#4F8EF7" }}
          onClick={() => navigate(`/task/${task._id}`)}
        >
          👁 View
        </button>

        <button
          className="btn btn-sm rounded-3 fw-semibold flex-fill border-0"
          style={{ background: "#1f1a2a", color: "#7B5EA7" }}
          onClick={() => navigate(`/edit/${task._id}`)}
        >
          ✏ Edit
        </button>

        <button
          className="btn btn-sm rounded-3 fw-semibold flex-fill border-0"
          style={{ background: "#2a0a0a", color: "#ff6b6b" }}
          onClick={deleteTask}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;