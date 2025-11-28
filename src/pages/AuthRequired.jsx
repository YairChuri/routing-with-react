import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../components/AuthContext";

export default function AuthRequired({ requiredRole }) {
  const { user, userData, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <Navigate
        to="login"
        state={{ message: "You must login first", path: location.pathname }}
        replace
      />
    );
  }

  if (requiredRole) {
    if (!userData) return <p>Loading user data...</p>;

    if (userData.role !== requiredRole) {
      return <Navigate to="/" replace />;
    }
  }
  return <Outlet />;
}
