import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #14cba8, #3a86ff, #6a00f4)",
      }}
    >
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="card shadow-lg p-4" style={{ width: "350px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4 fw-bold">Register</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button
            className="btn w-100 text-white fw-bold"
            style={{
              background: "linear-gradient(135deg, #14cba8, #3a86ff, #6a00f4)",
              border: "none",
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;