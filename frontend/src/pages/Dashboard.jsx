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

  // stats
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.filter(t => t.status === "pending").length;

  // filter + search
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed" && task.status !== "completed") return false;
    if (filter === "pending" && task.status !== "pending") return false;

    if (search && !task.title.toLowerCase().includes(search.toLowerCase()))
      return false;

    return true;
  });

  return (
    <div
      className="container-fluid min-vh-100 py-4"
      style={{
        background: "linear-gradient(135deg, #14cba8, #3a86ff, #6a00f4)",
      }}
    >
      <div className="container">

        {/* 🔢 Stats */}
        <div className="row text-center mb-4">
          <div className="col-md-4 mb-2">
            <div className="card shadow p-3 fw-bold">
              Total <br /> {total}
            </div>
          </div>

          <div className="col-md-4 mb-2">
            <div className="card shadow p-3 text-success fw-bold">
              Completed <br /> {completed}
            </div>
          </div>

          <div className="col-md-4 mb-2">
            <div className="card shadow p-3 text-warning fw-bold">
              Pending <br /> {pending}
            </div>
          </div>
        </div>

        {/* 🔍 Search + Button */}
        <div className="d-flex justify-content-between mb-3 gap-2 flex-wrap">
          <input
            className="form-control w-50"
            placeholder="Search tasks..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <Link
            to="/create"
            className="btn text-white fw-semibold"
            style={{
              background: "linear-gradient(135deg, #14cba8, #3a86ff, #6a00f4)",
              border: "none",
            }}
          >
            + New Task
          </Link>
        </div>

        {/* 🔘 Filters */}
        <div className="mb-4">
          <button
            className={`btn me-2 ${filter === "all" ? "btn-light" : "btn-outline-light"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={`btn me-2 ${filter === "pending" ? "btn-warning" : "btn-outline-warning"}`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

          <button
            className={`btn ${filter === "completed" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        {/* 📦 Tasks */}
        <div className="row">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <div className="col-md-4 mb-3" key={task._id}>
                <TaskCard task={task} refresh={fetchTasks} />
              </div>
            ))
          ) : (
            <div className="text-center text-white fw-bold mt-4">
              No tasks found 😢
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;