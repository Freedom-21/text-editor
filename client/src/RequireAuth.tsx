import { Outlet, Navigate } from "react-router-dom";

const RequireAuth = () => {
  const token = localStorage.getItem("accessToken");
  return token ? <Outlet /> : <Navigate to="/login" />;
};
export default RequireAuth;
