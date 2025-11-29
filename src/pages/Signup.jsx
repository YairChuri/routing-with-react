import { useState, useEffect, useContext } from "react";
import { createUser } from "../utils/api";
import AuthContext from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const { user, userData, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && user && userData) {
      navigate("/host", { replace: true });
    }
  }, [user, userData, loading, navigate]);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setStatus("signing");
      setError("");
      await createUser(
        loginFormData.name,
        loginFormData.email,
        loginFormData.password
      );
    } catch (err) {
      setError(err);
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
      <h1>Signup and rent your van!</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="Full Name"
          value={loginFormData.name}
        />
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

        <button disabled={status === "signing"}>
          {status === "signing" ? "Signing up..." : "Signup"}
        </button>

        {error && <p style={{ color: "#ff0000" }}>{error}</p>}
      </form>
    </div>
  );
}
