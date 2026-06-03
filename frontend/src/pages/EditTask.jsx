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
    category: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await API.get(`/tasks/${id}`);
        setTask({ ...res.data, dueDate: res.data.dueDate?.slice(0, 10) });
      } catch (err) {
        toast.error("Failed to load task ❌");
      }
    };
    fetchTask();
  }, [id]);

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
      await API.put(`/tasks/${id}`, task);
      toast.success("Task updated successfully ✏️");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-task-page">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="create-task-card">

        {/* Header */}
        <div className="ct-header">
          <div className="ct-icon et-icon">
            <i className="ti ti-edit" aria-hidden="true"></i>
          </div>
          <span className="ct-title">Edit Task</span>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Title */}
          <div className="ct-field">
            <label className="ct-label">Title</label>
            <input
              className="ct-input"
              name="title"
              placeholder="Task title"
              value={task.title}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="ct-field">
            <label className="ct-label">Description</label>
            <textarea
              className="ct-input ct-textarea"
              name="description"
              placeholder="What needs to be done?"
              value={task.description}
              onChange={handleChange}
            />
          </div>

          {/* Due Date + Priority */}
          <div className="ct-row2">
            <div className="ct-field">
              <label className="ct-label">Due Date</label>
              <input
                type="date"
                className="ct-input"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="ct-field">
              <label className="ct-label">Priority</label>
              <select
                className="ct-input ct-select"
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Category */}
          <div className="ct-field">
            <label className="ct-label">Category</label>
            <select
              className="ct-input ct-select"
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
          </div>

          <div className="ct-divider"></div>

          <button className="ct-submit-btn et-btn" disabled={loading}>
            {loading ? (
              <><i className="ti ti-loader" aria-hidden="true"></i> Saving...</>
            ) : (
              <><i className="ti ti-device-floppy" aria-hidden="true"></i> Save Changes</>
            )}
          </button>

          <button
            type="button"
            className="td-btn-back"
            style={{ marginTop: "0.55rem" }}
            onClick={() => navigate("/dashboard")}
          >
            <i className="ti ti-arrow-left" aria-hidden="true"></i>
            Back to Dashboard
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditTask;