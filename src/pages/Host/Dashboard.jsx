import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <h1>This is the Dshboard page</h1>
      <Outlet />
    </>
  );
}
