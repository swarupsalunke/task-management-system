import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim()) {
      toast.error("Please enter your email address ⚠️");
      return;
    }
    if (!form.password) {
      toast.error("Please enter your password ⚠️");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login successful 🚀");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed ❌");
    } finally {
      setLoading(false);
    }
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
          maxWidth: "420px",
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
          <h4 className="fw-bold mb-1 text-white">Welcome back</h4>
          <p className="small mb-0" style={{ color: "#888" }}>
            Sign in to your TaskFlow account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label
              className="form-label fw-semibold small text-uppercase"
              style={{ color: "#888", letterSpacing: "0.05em" }}
            >
              Email Address
            </label>
            <input
              className="form-control rounded-3 text-white border-0"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              style={{
                background: "#1f1f1f",
                color: "#fff",
              }}
            />
          </div>

          <div className="mb-4">
            <label
              className="form-label fw-semibold small text-uppercase"
              style={{ color: "#888", letterSpacing: "0.05em" }}
            >
              Password
            </label>
            <div className="input-group">
              <input
                className="form-control rounded-start-3 border-0 text-white"
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                style={{ background: "#1f1f1f" }}
              />
              <button
                type="button"
                className="btn border-0 rounded-end-3"
                onClick={() => setShowPass(!showPass)}
                tabIndex={-1}
                style={{ background: "#1f1f1f", color: "#888" }}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 fw-semibold text-white rounded-3 py-2 border-0"
            style={{
              background: "linear-gradient(90deg, #00D2B4, #4F8EF7, #7B5EA7)",
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" style={{ borderColor: "#2a2a2a" }} />
          <span className="mx-2 small" style={{ color: "#555" }}>or</span>
          <hr className="flex-grow-1" style={{ borderColor: "#2a2a2a" }} />
        </div>

        {/* Register link */}
        <p className="text-center small mb-0" style={{ color: "#888" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="fw-semibold text-decoration-none"
            style={{ color: "#4F8EF7" }}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;