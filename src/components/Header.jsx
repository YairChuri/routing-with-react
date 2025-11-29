import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/api";
import login from "../assets/login.svg";
import logout from "../assets/logout.svg";
import AuthContext from "./AuthContext";

export default function Header() {
  const { user, userData } = useContext(AuthContext);
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  function handleLogout() {
    signOut(auth)
      .then(() => <navigate to={"/"} />)
      .catch((err) => console.error("Logout failed", err));
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
            <div className="loggedin-user-info">
              <p>Welcome, {userData?.name}</p>
              <img src={logout} onClick={handleLogout} className="login-icon" />
            </div>
          ) : (
            <div className="loggedin-user-info">
              <p>Anonymous</p>

              <img src={login} className="login-icon" />
            </div>
          )}
        </Link>
      </nav>
    </header>
  );
}
