// src/pages/Login.jsx
import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../utils/api";
import AuthContext from "../components/AuthContext";

export default function Login() {
  const { user } = useContext(AuthContext); // get user from AuthContext
  const location = useLocation();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  // If the user is already logged in, redirect automatically
  if (user) {
    const backNav = location.state?.path || "/host";
    return <Navigate to={backNav} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("logging");
    setError("");

    try {
      await signInWithEmailAndPassword(
        auth,
        loginFormData.email,
        loginFormData.password
      );
      // No manual navigate() needed!
      // AuthContext will update and trigger the redirect above
    } catch (err) {
      setError(err.message);
    } finally {
      setStatus("idle");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="login-container">
      {location.state?.message ? (
        <h1>{location.state.message}</h1>
      ) : (
        <h1>Sign in to your account</h1>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />

        <button disabled={status === "logging"}>
          {status === "logging" ? "Logging in..." : "Log in"}
        </button>

        {error && <p style={{ color: "#ff0000" }}>{error}</p>}
      </form>
    </div>
  );
}
