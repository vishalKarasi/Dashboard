import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const Header = lazy(() => import("@pages/header/Header.jsx"));
const Footer = lazy(() => import("@pages/footer/Footer.jsx"));

const PrivateRoute = () => {
  const { accessToken, status } = useSelector((state) => state.auth);
  const notAuth = !accessToken && status === "error";
  return notAuth ? (
    <Navigate to="/" />
  ) : (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PrivateRoute;
