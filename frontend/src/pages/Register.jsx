import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      toast.success("Registered successfully 🚀");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong ❌");
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
          <div className="auth-brand-sub">Create your account</div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="auth-field">
            <label className="auth-label">Full Name</label>
            <div className="auth-input-wrap">
              <i className="ti ti-user" aria-hidden="true"></i>
              <input
                name="name"
                placeholder="Jack Sparrow"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div className="auth-field">
            <label className="auth-label">Email Address</label>
            <div className="auth-input-wrap">
              <i className="ti ti-mail" aria-hidden="true"></i>
              <input
                name="email"
                type="email"
                placeholder="jack@example.com"
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
            <i className="ti ti-rocket" aria-hidden="true"></i>
            Create Account
          </button>

        </form>

        <p className="auth-footer-link">
          Already have an account?{" "}
          <Link to="/">Sign in</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;