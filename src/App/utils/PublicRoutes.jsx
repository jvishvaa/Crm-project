import React from "react";
import { Outlet } from "react-router-dom";

const PublicRoutes = ({ authenticated, children, ...rest }) => {
  return <Outlet />;
};

export default PublicRoutes;
