import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import login from "../assets/login.svg";
import logout from "../assets/logout.svg";
export default function Header() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedin") === "true"
  );
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setLoggedIn(localStorage.getItem("loggedin") === "true");
    }, 500);

    return () => clearInterval(interval);
  }, []);
  function onLogin() {
    setLoggedIn(true);
  }
  function onLogout() {
    localStorage.removeItem("loggedin");
    setLoggedIn(false);
  }
  return (
    <header className="header">
      <Link className="header site-logo" to="/">
        #VANLIFE
      </Link>
      <nav className="nav-right">
        <NavLink
          to="/host"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
        >
          Vans
        </NavLink>
        <Link to="login" className="login-link">
          {localStorage.getItem("loggedin") !== null ? (
            // we are loggedin
            <img src={logout} onClick={onLogout} className="login-icon" />
          ) : (
            // we are loggedout
            <img src={login} onClick={onLogin} className="login-icon" />
          )}
        </Link>
      </nav>
    </header>
  );
}
