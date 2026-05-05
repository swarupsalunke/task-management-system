import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
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
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #14cba8, #3a86ff, #6a00f4)",
      }}
    >
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="card shadow-lg p-4" style={{ width: "350px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4 fw-bold">Login</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
          />

          <input
            className="form-control mb-3"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
          />

          <button
            className="btn w-100 text-white fw-bold"
            style={{
              background: "linear-gradient(135deg, #14cba8, #3a86ff, #6a00f4)",
              border: "none",
            }}
          >
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="fw-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;