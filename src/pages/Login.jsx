import React from "react";
import { loginUser } from "../utils/api";

import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState("");
  const location = useLocation();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(loginFormData);
    async function login() {
      try {
        setStatus("logging");
        const req = await loginUser(loginFormData);
        setError("");
        localStorage.setItem("loggedin", true);
        const backNav =
          location.state?.path !== null ? location.state?.path : "/host";
        navigate(backNav, { replace: true });
      } catch (err) {
        setError(`${err.statusText}. ${err.message}`);
      } finally {
        setStatus("idle");
      }
    }
    login();
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      {location.state?.message ? (
        <h1>{location.state?.message}</h1>
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
        {status === "idle" ? (
          <button>Log in</button>
        ) : (
          <button>Logging...</button>
        )}
        {error != "" ? <p style={{ color: "#ff0000" }}>{error}</p> : null}
      </form>
    </div>
  );
}
