import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const total     = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending   = tasks.filter((t) => t.status === "pending").length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed" && task.status !== "completed") return false;
    if (filter === "pending"   && task.status !== "pending")   return false;
    if (search && !task.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // shared style objects
  const inputStyle = {
    background: "#1f1f1f",
    border: "1px solid #2a2a2a",
    color: "#fff",
  };

  const filterBtn = (value, activeColor) => ({
    background: filter === value ? activeColor : "#1f1f1f",
    border: `1px solid ${filter === value ? activeColor : "#2a2a2a"}`,
    color: filter === value ? "#fff" : "#888",
    transition: "all 0.2s",
  });

  return (
    <div
      className="min-vh-100 py-4 px-3"
      style={{ background: "#0a0a0a" }}
    >
      <div className="container">

        {/* ── Stats row ─────────────────────────────────── */}
        <div className="row g-3 mb-4">
          {[
            { label: "Total Tasks",  value: total,     color: "#4F8EF7", bg: "#1a1f2a", border: "#1e2d4a" },
            { label: "Completed",    value: completed, color: "#00D2B4", bg: "#0a2a1a", border: "#143d28" },
            { label: "Pending",      value: pending,   color: "#f5a623", bg: "#2a1f00", border: "#3d2e00" },
          ].map((s) => (
            <div className="col-4" key={s.label}>
              <div
                className="rounded-4 p-3 text-center"
                style={{
                  background: s.bg,
                  border: `1px solid ${s.border}`,
                }}
              >
                <div
                  className="fw-bold mb-1"
                  style={{ fontSize: "1.8rem", color: s.color }}
                >
                  {s.value}
                </div>
                <div className="small fw-semibold" style={{ color: "#888" }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Search + New Task ─────────────────────────── */}
        <div className="d-flex gap-2 mb-3 flex-wrap">
          <input
            className="form-control rounded-3 border-0 flex-grow-1"
            placeholder="🔍  Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={inputStyle}
          />

          <Link
            to="/create"
            className="btn fw-semibold text-white rounded-3 border-0 px-4"
            style={{
              background: "linear-gradient(90deg, #00D2B4, #4F8EF7, #7B5EA7)",
              whiteSpace: "nowrap",
            }}
          >
            + New Task
          </Link>
        </div>

        {/* ── Filter buttons ────────────────────────────── */}
        <div className="d-flex gap-2 mb-4 flex-wrap">
          <button
            className="btn btn-sm rounded-3 fw-semibold"
            style={filterBtn("all", "#4F8EF7")}
            onClick={() => setFilter("all")}
          >
            All
            <span
              className="ms-2 badge rounded-pill"
              style={{
                background: filter === "all" ? "rgba(255,255,255,0.25)" : "#2a2a2a",
                color: filter === "all" ? "#fff" : "#888",
                fontSize: "0.7rem",
              }}
            >
              {total}
            </span>
          </button>

          <button
            className="btn btn-sm rounded-3 fw-semibold"
            style={filterBtn("pending", "#f5a623")}
            onClick={() => setFilter("pending")}
          >
            Pending
            <span
              className="ms-2 badge rounded-pill"
              style={{
                background: filter === "pending" ? "rgba(255,255,255,0.25)" : "#2a2a2a",
                color: filter === "pending" ? "#fff" : "#888",
                fontSize: "0.7rem",
              }}
            >
              {pending}
            </span>
          </button>

          <button
            className="btn btn-sm rounded-3 fw-semibold"
            style={filterBtn("completed", "#00D2B4")}
            onClick={() => setFilter("completed")}
          >
            Completed
            <span
              className="ms-2 badge rounded-pill"
              style={{
                background: filter === "completed" ? "rgba(255,255,255,0.25)" : "#2a2a2a",
                color: filter === "completed" ? "#fff" : "#888",
                fontSize: "0.7rem",
              }}
            >
              {completed}
            </span>
          </button>
        </div>

        {/* ── Task Grid ─────────────────────────────────── */}
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border"
              style={{ color: "#4F8EF7" }}
              role="status"
            />
            <p className="mt-3 small" style={{ color: "#888" }}>
              Loading tasks…
            </p>
          </div>
        ) : filteredTasks.length > 0 ? (
          <div className="row g-3">
            {filteredTasks.map((task) => (
              <div className="col-12 col-md-6 col-lg-4" key={task._id}>
                <TaskCard task={task} refresh={fetchTasks} />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-center rounded-4 py-5"
            style={{
              background: "#141414",
              border: "1px solid #2a2a2a",
            }}
          >
            <div style={{ fontSize: "2.5rem" }}>📭</div>
            <p className="fw-semibold mt-2 mb-0 text-white">No tasks found</p>
            <p className="small mt-1" style={{ color: "#888" }}>
              {search ? "Try a different search term" : "Click '+ New Task' to get started"}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;