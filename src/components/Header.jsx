import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/api";
import login from "../assets/login.svg";
import logout from "../assets/logout.svg";

export default function Header() {
  const [user, setUser] = useState(null);
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  function handleLogout() {
    signOut(auth).catch((err) => console.error("Logout failed", err));
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
          {user ? (
            // we are loggedin
            <img src={logout} onClick={handleLogout} className="login-icon" />
          ) : (
            // we are loggedout
            <img src={login} className="login-icon" />
          )}
        </Link>
      </nav>
    </header>
  );
}
