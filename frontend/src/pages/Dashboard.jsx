import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.filter(t => t.status === "pending").length;

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed" && task.status !== "completed") return false;
    if (filter === "pending" && task.status !== "pending") return false;
    if (search && !task.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="container-fluid min-vh-100 py-4 dashboard-page">
      <div className="container">

        {/* Stats */}
        <div className="row text-center mb-4">
          <div className="col-md-4 mb-2">
            <div className="card stat-card total p-3">
              <div className="stat-label">Total</div>
              <div className="stat-number">{total}</div>
              <div className="stat-bar">
                <div className="stat-bar-fill" style={{ width: "100%" }}></div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-2">
            <div className="card stat-card done p-3">
              <div className="stat-label">Completed</div>
              <div className="stat-number">{completed}</div>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill"
                  style={{ width: total ? `${(completed / total) * 100}%` : "0%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-2">
            <div className="card stat-card pending p-3">
              <div className="stat-label">Pending</div>
              <div className="stat-number">{pending}</div>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill"
                  style={{ width: total ? `${(pending / total) * 100}%` : "0%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Search + New Task */}
        <div className="d-flex justify-content-between mb-3 gap-2 flex-wrap">
          <div className="search-wrapper">
            <i className="ti ti-search" style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px" }}></i>
            <input
              className="form-control"
              placeholder="Search tasks..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Link to="/create" className="btn-new-task btn">
            + New Task
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-4 d-flex gap-2">
          <button
            className={`filter-btn all ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={`filter-btn pending ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

          <button
            className={`filter-btn completed ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        {/* Task Cards */}
        <div className="row">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <div className="col-md-4 mb-3" key={task._id}>
                <TaskCard task={task} refresh={fetchTasks} />
              </div>
            ))
          ) : (
            <div className="text-center mt-4 empty-state">
              No tasks found 😢
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;