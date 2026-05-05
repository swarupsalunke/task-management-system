import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    category: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title || !task.description || !task.dueDate || !task.category) {
      toast.error("All fields are required ⚠️");
      return;
    }

    try {
      setLoading(true);

      await API.post("/tasks", task);

      toast.success("Task created successfully ✅");

      setTimeout(() => navigate("/dashboard"), 1500);

    } catch (err) {
      toast.error(err.response?.data?.msg || "Error creating task ❌");
    } finally {
      setLoading(false);
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
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4 fw-bold">Create Task</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="title"
            placeholder="Title"
            value={task.title}
            onChange={handleChange}
          />

          <textarea
            className="form-control mb-3"
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
          />

          <input
            type="date"
            className="form-control mb-3"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />

          <select
            className="form-control mb-3"
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <select
            className="form-control mb-4"
            name="category"
            value={task.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
            <option value="Learning">Learning</option>
          </select>

          <button
            className="btn w-100 text-white fw-bold"
            style={{
              background: "linear-gradient(135deg, #14cba8, #3a86ff, #6a00f4)",
              border: "none",
            }}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;