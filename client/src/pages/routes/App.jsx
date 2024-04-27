import React, { useEffect, lazy } from "react";
import { refreshToken } from "@app/services/authSlice.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Auth from "@pages/auth/Auth.jsx";
const PublicRoute = lazy(() => import("./PublicRoute.jsx"));
const PrivateRoute = lazy(() => import("./PrivateRoute.jsx"));

const Home = lazy(() => import("@pages/home/Home.jsx"));
const Profile = lazy(() => import("@pages/profile/Profile.jsx"));
const TableInsight = lazy(() => import("@pages/tableInsight/TableInsight.jsx"));
const GraphInsight = lazy(() => import("@pages/graphInsight/GraphInsight.jsx"));
const ChartInsight = lazy(() => import("@pages/chartInsight/ChartInsight.jsx"));

import PageNotFound from "@pages/PageNotFound.jsx";
import { getAdmin } from "@app/services/adminSlice.js";

function App() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.ui);
  const { id, accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    document.body.className = mode;
    if (!accessToken) dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) dispatch(getAdmin(id));
  }, [id]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Auth />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/table" element={<TableInsight />} />
          <Route path="/graph" element={<GraphInsight />} />
          <Route path="/chart" element={<ChartInsight />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
