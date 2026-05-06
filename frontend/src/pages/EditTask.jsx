import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    category: "",
  });

  const [loading, setLoading]     = useState(false);
  const [fetching, setFetching]   = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await API.get(`/tasks/${id}`);
        setTask({ ...res.data, dueDate: res.data.dueDate?.slice(0, 10) });
      } catch {
        toast.error("Failed to load task ❌");
      } finally {
        setFetching(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title.trim()) {
      toast.error("Task title is required ⚠️");
      return;
    }
    if (!task.description.trim()) {
      toast.error("Description is required ⚠️");
      return;
    }
    if (!task.dueDate) {
      toast.error("Please select a due date ⚠️");
      return;
    }
    if (!task.category) {
      toast.error("Please select a category ⚠️");
      return;
    }

    try {
      setLoading(true);
      await API.put(`/tasks/${id}`, task);
      toast.success("Task updated successfully ✏️");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "#1f1f1f",
    border: "1px solid #2a2a2a",
    color: "#fff",
  };

  const labelStyle = {
    color: "#888",
    letterSpacing: "0.05em",
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center px-3"
      style={{ background: "#0a0a0a" }}
    >
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />

      <div
        className="rounded-4 p-4 w-100"
        style={{
          maxWidth: "460px",
          background: "#141414",
          border: "1px solid #2a2a2a",
        }}
      >
        {/* Logo + Heading */}
        <div className="text-center mb-4">
          <div
            className="rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
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
          <h4 className="fw-bold mb-1 text-white">Edit Task</h4>
          <p className="small mb-0" style={{ color: "#888" }}>
            Update the details below
          </p>
        </div>

        {/* Fetching spinner */}
        {fetching ? (
          <div className="text-center py-4">
            <div
              className="spinner-border"
              style={{ color: "#4F8EF7" }}
              role="status"
            />
            <p className="mt-3 small mb-0" style={{ color: "#888" }}>
              Loading task…
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>

            {/* Title */}
            <div className="mb-3">
              <label
                className="form-label fw-semibold small text-uppercase"
                style={labelStyle}
              >
                Task Title
              </label>
              <input
                className="form-control rounded-3 border-0 text-white"
                name="title"
                placeholder="What needs to be done?"
                value={task.title}
                onChange={handleChange}
                disabled={loading}
                style={inputStyle}
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label
                className="form-label fw-semibold small text-uppercase"
                style={labelStyle}
              >
                Description
              </label>
              <textarea
                className="form-control rounded-3 border-0 text-white"
                name="description"
                placeholder="Add more details..."
                value={task.description}
                onChange={handleChange}
                disabled={loading}
                rows={3}
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>

            {/* Due Date */}
            <div className="mb-3">
              <label
                className="form-label fw-semibold small text-uppercase"
                style={labelStyle}
              >
                Due Date
              </label>
              <input
                type="date"
                className="form-control rounded-3 border-0 text-white"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                disabled={loading}
                style={inputStyle}
              />
            </div>

            {/* Priority + Category side by side */}
            <div className="row g-3 mb-4">
              <div className="col-6">
                <label
                  className="form-label fw-semibold small text-uppercase"
                  style={labelStyle}
                >
                  Priority
                </label>
                <select
                  className="form-select rounded-3 border-0 text-white"
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                  disabled={loading}
                  style={inputStyle}
                >
                  <option value="Low">🟢 Low</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="High">🔴 High</option>
                </select>
              </div>

              <div className="col-6">
                <label
                  className="form-label fw-semibold small text-uppercase"
                  style={labelStyle}
                >
                  Category
                </label>
                <select
                  className="form-select rounded-3 border-0 text-white"
                  name="category"
                  value={task.category}
                  onChange={handleChange}
                  disabled={loading}
                  style={inputStyle}
                >
                  <option value="">Select...</option>
                  <option value="Work">💼 Work</option>
                  <option value="Personal">👤 Personal</option>
                  <option value="Shopping">🛒 Shopping</option>
                  <option value="Health">❤️ Health</option>
                  <option value="Learning">📚 Learning</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn fw-semibold rounded-3 py-2 border-0"
                style={{ background: "#1f1f1f", color: "#888", width: "40%" }}
                onClick={() => navigate("/dashboard")}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn fw-semibold text-white rounded-3 py-2 border-0"
                style={{
                  background: "linear-gradient(90deg, #00D2B4, #4F8EF7, #7B5EA7)",
                  width: "60%",
                }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Saving…
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}

export default EditTask;