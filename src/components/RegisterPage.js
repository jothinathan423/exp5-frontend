import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FormPages.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        throw new Error("Token not received");
      }
    } catch (err) {
      console.error(
        "Error registering:",
        err.response ? err.response.data : err.message
      );
      setError(
        err.response?.data?.msg || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
