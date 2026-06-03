import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await API.get(`/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        toast.error("Failed to load task ❌");
      }
    };
    fetchTask();
  }, [id]);

  const markComplete = async () => {
    try {
      await API.put(`/tasks/${id}`, { status: "completed" });
      toast.success("Task marked as completed ✅");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      toast.error("Failed to update task ❌");
    }
  };

  const priorityClass = {
    Low: "td-priority-low",
    Medium: "td-priority-med",
    High: "td-priority-high",
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

  return (
    <div className="task-detail-page">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="td-card">

        {/* Title + Status */}
        <div className="td-top">
          <h2 className="td-title">{task.title || "Loading..."}</h2>
          <span className={`td-status-badge ${task.status === "completed" ? "td-badge-done" : "td-badge-pending"}`}>
            <i className={`ti ${task.status === "completed" ? "ti-circle-check" : "ti-clock"}`} aria-hidden="true"></i>
            {task.status || "pending"}
          </span>
        </div>

        <p className="td-desc">{task.description || ""}</p>

        <div className="td-divider"></div>

        {/* Meta rows */}
        <div className="td-meta">
          <div className="td-row">
            <span className="td-row-label">
              <i className="ti ti-flag" aria-hidden="true"></i> Priority
            </span>
            <span className={`td-meta-badge ${priorityClass[task.priority] || "td-priority-low"}`}>
              {task.priority || "—"}
            </span>
          </div>

          <div className="td-row">
            <span className="td-row-label">
              <i className="ti ti-tag" aria-hidden="true"></i> Category
            </span>
            <span className="td-meta-badge td-badge-cat">
              {task.category || "—"}
            </span>
          </div>

          <div className="td-row">
            <span className="td-row-label">
              <i className="ti ti-calendar" aria-hidden="true"></i> Due Date
            </span>
            <span className="td-meta-badge td-badge-date">
              {formatDate(task.dueDate)}
            </span>
          </div>
        </div>

        {/* Buttons */}
        {task.status !== "completed" && (
          <button className="td-btn-complete" onClick={markComplete}>
            <i className="ti ti-circle-check" aria-hidden="true"></i>
            Mark Complete
          </button>
        )}

        <button className="td-btn-back" onClick={() => navigate("/dashboard")}>
          <i className="ti ti-arrow-left" aria-hidden="true"></i>
          Back to Dashboard
        </button>

      </div>
    </div>
  );
}

export default TaskDetail;