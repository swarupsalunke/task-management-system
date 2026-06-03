import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("All fields are required ⚠️");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login successful 🚀");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed ❌");
    }
  };

  return (
    <div className="auth-page">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="auth-card">

        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <i className="ti ti-clipboard-list" aria-hidden="true"></i>
          </div>
          <div className="auth-brand-name">TaskFlow</div>
          <div className="auth-brand-sub">Welcome back! Sign in to continue</div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="auth-field">
            <label className="auth-label">Email Address</label>
            <div className="auth-input-wrap">
              <i className="ti ti-mail" aria-hidden="true"></i>
              <input
                name="email"
                type="email"
                placeholder="jack@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrap">
              <i className="ti ti-lock" aria-hidden="true"></i>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
              <i
                className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"} auth-eye`}
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password"
              ></i>
            </div>
          </div>

          <div className="auth-divider"></div>

          <button className="auth-submit-btn">
            <i className="ti ti-login" aria-hidden="true"></i>
            Sign In
          </button>

        </form>

        <p className="auth-footer-link">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;