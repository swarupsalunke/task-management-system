
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
      className="navbar navbar-expand-lg px-3 shadow"
      style={{
        background: "linear-gradient(135deg, #14cba8, #3a86ff, #6a00f4)",
      }}
    >
      {/* Logo */}
      <Link
        className="navbar-brand d-flex align-items-center text-white fw-bold"
        to="/dashboard"
      >
        <img
          src="https://i.redd.it/hi-this-is-a-logo-for-the-task-manager-application-called-v0-si3hzlaglc7b1.png?width=8113&format=png&auto=webp&s=750d601f5c083ada2e639535f6b0576fbcb2dc31"
          alt="logo"
          style={{ width: "38px", marginRight: "8px", borderRadius: "8px" }}
        />
        TaskFlow
      </Link>

      {/* ✅ Mobile Toggle Button */}
      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* ✅ Collapsible Content */}
      <div className="collapse navbar-collapse" id="navbarContent">
        <div className="ms-auto d-flex align-items-lg-center flex-column flex-lg-row mt-3 mt-lg-0">

          {token ? (
            <>
              {/* User */}
              <span className="text-white fw-semibold me-lg-3 mb-2 mb-lg-0 text-center">
                Hi, {user?.name || "User"}
              </span>

              {/* Buttons */}
              <Link
                className="btn btn-light fw-semibold me-lg-2 mb-2 mb-lg-0"
                to="/dashboard"
              >
                Dashboard
              </Link>

              <Link
                className="btn btn-light fw-semibold me-lg-3 mb-2 mb-lg-0"
                to="/create"
              >
                New Task
              </Link>

              <button
                className="btn fw-semibold"
                style={{
                  background: "#ff4d4f",
                  color: "white",
                  border: "none",
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="btn btn-light fw-semibold me-lg-2 mb-2 mb-lg-0"
                to="/"
              >
                Login
              </Link>

              <Link
                className="btn btn-light fw-semibold"
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


