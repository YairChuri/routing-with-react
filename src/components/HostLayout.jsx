import { NavLink, Outlet } from "react-router-dom";
export default function HostLayout() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  return (
    <>
      <nav className="host-nav">
        <NavLink
          to="."
          end
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="income"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
        >
          Income
        </NavLink>
        <NavLink
          to="vans"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
        >
          Vans
        </NavLink>
        <NavLink
          to="reviews"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
