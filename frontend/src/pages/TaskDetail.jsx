import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask]       = useState({});
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await API.get(`/tasks/${id}`);
        setTask(res.data);
      } catch {
        toast.error("Failed to load task ❌");
      } finally {
        setFetching(false);
      }
    };
    fetchTask();
  }, [id]);

  const toggleStatus = async () => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    setLoading(true);
    try {
      await API.put(`/tasks/${id}`, { status: newStatus });
      setTask({ ...task, status: newStatus });
      toast.success(
        newStatus === "completed"
          ? "Task marked as completed ✅"
          : "Task marked as pending ↩️"
      );
    } catch {
      toast.error("Failed to update task ❌");
    } finally {
      setLoading(false);
    }
  };

  const isCompleted = task.status === "completed";

  const priorityStyle =
    task.priority === "High"
      ? { bg: "#2a0a0a", color: "#ff6b6b", border: "#3d1414" }
      : task.priority === "Medium"
      ? { bg: "#2a1f00", color: "#f5a623", border: "#3d2e00" }
      : { bg: "#0a2a1a", color: "#00D2B4", border: "#143d28" };

  const isOverdue =
    !isCompleted && task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center px-3"
      style={{ background: "#0a0a0a" }}
    >
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />

      <div
        className="rounded-4 p-4 w-100"
        style={{
          maxWidth: "480px",
          background: "#141414",
          border: "1px solid #2a2a2a",
        }}
      >
        {/* Logo */}
        <div className="text-center mb-4">
          <div
            className="rounded-3 d-inline-flex align-items-center justify-content-center"
            style={{
              width: 56, height: 56,
              background: "linear-gradient(135deg, #00D2B4, #4F8EF7, #7B5EA7)",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M6 9 Q15 3 24 9 L24 15 Q15 9 6 15 Z" fill="white" opacity="0.9" />
              <path d="M6 15 Q15 9 24 15 L24 21 Q15 27 6 21 Z" fill="white" opacity="0.6" />
            </svg>
          </div>
        </div>

        {fetching ? (
          <div className="text-center py-4">
            <div className="spinner-border" style={{ color: "#4F8EF7" }} role="status" />
            <p className="mt-3 small mb-0" style={{ color: "#888" }}>Loading task…</p>
          </div>
        ) : (
          <>
            {/* Title + status badge */}
            <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
              <h5
                className="fw-bold mb-0"
                style={{
                  color: isCompleted ? "#555" : "#fff",
                  textDecoration: isCompleted ? "line-through" : "none",
                }}
              >
                {task.title}
              </h5>
              <span
                className="badge rounded-pill flex-shrink-0"
                style={
                  isCompleted
                    ? { background: "#0a2a1a", color: "#00D2B4", border: "1px solid #143d28" }
                    : { background: "#1f1f1f", color: "#888",    border: "1px solid #2a2a2a" }
                }
              >
                {isCompleted ? "✓ Completed" : "○ Pending"}
              </span>
            </div>

            {/* Description */}
            <p className="small mb-3" style={{ color: "#888", lineHeight: 1.6 }}>
              {task.description || "No description provided."}
            </p>

            {/* Divider */}
            <div style={{ height: "1px", background: "#2a2a2a", marginBottom: "1rem" }} />

            {/* Detail pills */}
            <div className="row g-2 mb-3">

              {/* Priority */}
              <div className="col-6">
                <div
                  className="rounded-3 p-2 text-center"
                  style={{
                    background: priorityStyle.bg,
                    border: `1px solid ${priorityStyle.border}`,
                  }}
                >
                  <div className="small fw-semibold text-uppercase mb-1" style={{ color: "#555", fontSize: "0.65rem", letterSpacing: "0.05em" }}>
                    Priority
                  </div>
                  <div className="fw-bold small" style={{ color: priorityStyle.color }}>
                    {task.priority === "High" ? "🔴" : task.priority === "Medium" ? "🟡" : "🟢"}{" "}
                    {task.priority}
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="col-6">
                <div
                  className="rounded-3 p-2 text-center"
                  style={{ background: "#1a1f2a", border: "1px solid #1e2d4a" }}
                >
                  <div className="small fw-semibold text-uppercase mb-1" style={{ color: "#555", fontSize: "0.65rem", letterSpacing: "0.05em" }}>
                    Category
                  </div>
                  <div className="fw-bold small" style={{ color: "#4F8EF7" }}>
                    {task.category === "Work"     ? "💼" :
                     task.category === "Personal" ? "👤" :
                     task.category === "Shopping" ? "🛒" :
                     task.category === "Health"   ? "❤️" :
                     task.category === "Learning" ? "📚" : "📁"}{" "}
                    {task.category}
                  </div>
                </div>
              </div>

              {/* Due Date */}
              <div className="col-12">
                <div
                  className="rounded-3 p-2 text-center"
                  style={{
                    background: isOverdue ? "#2a0a0a" : "#1f1f1f",
                    border: `1px solid ${isOverdue ? "#3d1414" : "#2a2a2a"}`,
                  }}
                >
                  <div className="small fw-semibold text-uppercase mb-1" style={{ color: "#555", fontSize: "0.65rem", letterSpacing: "0.05em" }}>
                    Due Date
                  </div>
                  <div className="fw-bold small" style={{ color: isOverdue ? "#ff6b6b" : "#aaa" }}>
                    {isOverdue ? "⚠ Overdue — " : "📅 "}
                    {task.dueDate
                      ? new Date(task.dueDate).toDateString()
                      : "No due date"}
                  </div>
                </div>
              </div>

            </div>

            {/* Action buttons */}
            <div className="d-flex gap-2 mt-2">
              <button
                type="button"
                className="btn fw-semibold rounded-3 py-2 border-0"
                style={{ background: "#1f1f1f", color: "#888", width: "40%" }}
                onClick={() => navigate("/dashboard")}
              >
                ← Back
              </button>

              <button
                className="btn fw-semibold rounded-3 py-2 border-0 text-white"
                style={{
                  background: isCompleted
                    ? "#1f1f1f"
                    : "linear-gradient(90deg, #00D2B4, #4F8EF7, #7B5EA7)",
                  color: isCompleted ? "#888" : "#fff",
                  width: "60%",
                  border: isCompleted ? "1px solid #2a2a2a" : "none",
                }}
                onClick={toggleStatus}
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm" role="status" />
                ) : isCompleted ? (
                  "↩ Mark as Pending"
                ) : (
                  "✓ Mark Complete"
                )}
              </button>
            </div>

            {/* Edit shortcut */}
            <div className="text-center mt-3">
              <button
                className="btn btn-sm border-0"
                style={{ color: "#4F8EF7", background: "transparent" }}
                onClick={() => navigate(`/edit/${id}`)}
              >
                ✏ Edit this task
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskDetail;