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

  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #14cba8, #3a86ff, #6a00f4)",
      }}
    >
      <ToastContainer position="top-right" autoClose={2000} />

      <div
        className="card shadow-lg p-4"
        style={{ width: "420px", borderRadius: "15px" }}
      >
        <h3 className="fw-bold mb-3">{task.title}</h3>

        <p className="text-muted">{task.description}</p>

        <hr />

        <p>
          <b>Priority:</b>{" "}
          <span className="badge bg-warning text-dark">
            {task.priority}
          </span>
        </p>

        <p>
          <b>Category:</b>{" "}
          <span className="badge bg-info text-dark">
            {task.category}
          </span>
        </p>

        <p>
          <b>Status:</b>{" "}
          <span
            className={`badge ${
              task.status === "completed"
                ? "bg-success"
                : "bg-secondary"
            }`}
          >
            {task.status}
          </span>
        </p>

        <button
          className="btn w-100 text-white fw-bold mt-3"
          style={{
            background: "linear-gradient(135deg, #14cba8, #3a86ff, #6a00f4)",
            border: "none",
          }}
          onClick={markComplete}
        >
          Mark Complete
        </button>
      </div>
    </div>
  );
}

export default TaskDetail;