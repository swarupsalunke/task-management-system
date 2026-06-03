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

  const initials = user?.name
    ? user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <nav className="navbar navbar-expand-lg px-3 taskflow-navbar">

      {/* Brand */}
      <Link className="navbar-brand taskflow-brand" to="/dashboard">
        <div className="nb-brand-icon">
          <i className="ti ti-clipboard-list" aria-hidden="true"></i>
        </div>
        <span className="nb-brand-text">TaskFlow</span>
      </Link>

      {/* Mobile toggle */}
      <button
        className="navbar-toggler nb-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-label="Toggle navigation"
      >
        <i className="ti ti-menu-2" aria-hidden="true"></i>
      </button>

      {/* Collapsible content */}
      <div className="collapse navbar-collapse" id="navbarContent">
        <div className="ms-auto d-flex align-items-lg-center flex-column flex-lg-row gap-2 mt-3 mt-lg-0">

          {token ? (
            <>
              {/* Avatar + greeting */}
              <div className="nb-greeting">
                <div className="nb-avatar">{initials}</div>
                <span>Hi, {user?.name?.split(" ")[0] || "User"}</span>
              </div>

              <div className="nb-sep d-none d-lg-block"></div>

              <Link className="nb-btn" to="/dashboard">
                <i className="ti ti-layout-dashboard" aria-hidden="true"></i>
                Dashboard
              </Link>

              <Link className="nb-btn nb-btn-solid" to="/create">
                <i className="ti ti-circle-plus" aria-hidden="true"></i>
                New Task
              </Link>

              <div className="nb-sep d-none d-lg-block"></div>

              <button className="nb-btn nb-btn-danger" onClick={handleLogout}>
                <i className="ti ti-logout" aria-hidden="true"></i>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nb-btn" to="/">
                <i className="ti ti-login" aria-hidden="true"></i>
                Login
              </Link>

              <Link className="nb-btn nb-btn-solid" to="/register">
                <i className="ti ti-user-plus" aria-hidden="true"></i>
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