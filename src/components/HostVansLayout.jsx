import { NavLink, Outlet } from "react-router-dom";

export default function HostVansLayout({ van }) {
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
          Details
        </NavLink>
        <NavLink
          to="pricing"
          end
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
        >
          Pricing
        </NavLink>
        <NavLink
          to="photos"
          end
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
        >
          Photos
        </NavLink>
      </nav>
      <Outlet context={van} />
    </>
  );
}
