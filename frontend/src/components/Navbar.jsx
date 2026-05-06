import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-4"
      style={{
        background: "#141414",
        borderBottom: "1px solid #2a2a2a",
      }}
    >
      {/* Logo + Brand */}
      <Link
        className="navbar-brand d-flex align-items-center gap-2 text-white fw-bold"
        to="/dashboard"
      >
        <div
          className="rounded-2 d-flex align-items-center justify-content-center"
          style={{
            width: 36, height: 36,
            background: "linear-gradient(135deg, #00D2B4, #4F8EF7, #7B5EA7)",
            flexShrink: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
            <path d="M6 9 Q15 3 24 9 L24 15 Q15 9 6 15 Z" fill="white" opacity="0.9" />
            <path d="M6 15 Q15 9 24 15 L24 21 Q15 27 6 21 Z" fill="white" opacity="0.6" />
          </svg>
        </div>
        TaskFlow
        
      </Link>

      {/* Mobile Toggle */}
      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        style={{ filter: "invert(1)" }}
      >
        <span className="navbar-toggler-icon" />
      </button>

      {/* Collapsible Content */}
      <div className="collapse navbar-collapse" id="navbarContent">
        <div className="ms-auto d-flex align-items-lg-center flex-column flex-lg-row gap-2 mt-3 mt-lg-0">

          {token ? (
            <>
              {/* User greeting */}
              <span
                className="fw-semibold small px-2 text-center"
                style={{ color: "#888" }}
              >
                Hi, {user?.name || "User"} 👋
              </span>

              <Link
                className="btn btn-sm fw-semibold rounded-3"
                style={{
                  background: "#1f1f1f",
                  color: "#fff",
                  border: "1px solid #2a2a2a",
                }}
                to="/dashboard"
              >
                Dashboard
              </Link>

              <Link
                className="btn btn-sm fw-semibold rounded-3 text-white border-0"
                style={{
                  background: "linear-gradient(90deg, #00D2B4, #4F8EF7, #7B5EA7)",
                }}
                to="/create"
              >
                + New Task
              </Link>

              <button
                className="btn btn-sm fw-semibold rounded-3"
                style={{
                  background: "#2a0a0a",
                  color: "#ff6b6b",
                  border: "1px solid #3d1414",
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="btn btn-sm fw-semibold rounded-3"
                style={{
                  background: "#1f1f1f",
                  color: "#fff",
                  border: "1px solid #2a2a2a",
                }}
                to="/"
              >
                Sign In
              </Link>

              <Link
                className="btn btn-sm fw-semibold rounded-3 text-white border-0"
                style={{
                  background: "linear-gradient(90deg, #00D2B4, #4F8EF7, #7B5EA7)",
                }}
                to="/register"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;