import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data get ", form);

    try {
      const res = await axios.post(
        " https://blogpost-mzlh.onrender.com/user/login",
        form
      );
      sessionStorage.setItem("token", res.data.token);
      console.log("data get by resposnse", res.data);
      alert(res.data?.user?.data || "loggin Successful!");
      navigate("/");
    } catch (err) {
      console.log("loggin ERROR:", err.response?.data || err);
      alert(err.response?.data?.message || "login failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Login</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
        <button
          type="submit"
          onClick={() => navigate("/signup")}
          className="btn btn-success w-100"
        >
          signup
        </button>
      </form>
    </div>
  );
};

export default Login;
