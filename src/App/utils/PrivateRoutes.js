import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const PrivateRoutes = () => {
  const authValue = useAuth();
  const location = useLocation();
  return authValue?.loginDetails?.user_details?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
