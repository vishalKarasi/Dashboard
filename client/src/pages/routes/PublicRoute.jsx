import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { accessToken, status } = useSelector((state) => state.auth);
  const auth = accessToken && status === "success";
  return auth ? <Navigate to="/table" /> : <Outlet />;
};

export default PublicRoute;
