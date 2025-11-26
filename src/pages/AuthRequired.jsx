import { Navigate, Outlet, useLocation } from "react-router-dom";
export default function AuthRequired() {
  const authenticated = localStorage.getItem("loggedin");
  const location = useLocation();

  console.log(location.pathname);

  if (!authenticated) {
    return (
      <Navigate
        to="login"
        state={{ message: "You must login first", path: location.pathname }}
        replace
      />
    );
  }

  return <Outlet />;
}
