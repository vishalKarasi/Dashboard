import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice.js";
import authSlice from "./authSlice.js";
import insightSlice from "./insightSlice.js";
import adminSlice from "./adminSlice.js";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    auth: authSlice,
    admin: adminSlice,
    insight: insightSlice,
  },
});

export default store;
