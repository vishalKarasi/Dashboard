import "./main.scss";
import store from "@app/services/store.js";
import { Provider } from "react-redux";

import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "@src/pages/routes/App.jsx";

import Model from "@components/model/Model.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback={<Model type="loading" />}>
      <ToastContainer position="top-right" autoClose={250} />
      <App />
    </Suspense>
  </Provider>
);
