import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  deleteAdminApi,
  getAdminApi,
  updateAdminApi,
} from "@app/api/adminApi.js";
import { logout } from "./authSlice";

const initialState = {
  admin: {},
  message: "",
  status: "idle",
};

export const getAdmin = createAsyncThunk("admin/get", async (id) => {
  try {
    const { data } = await getAdminApi(id);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const deleteAdmin = createAsyncThunk(
  "admin/delete",
  async (id, { dispatch }) => {
    try {
      const { data } = await deleteAdminApi(id);
      dispatch(logout());
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const updateAdmin = createAsyncThunk(
  "user/update",
  async ({ id, credential }) => {
    try {
      const { data } = await updateAdminApi(id, credential);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    builder

      // get admin promises
      .addCase(getAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAdmin.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.admin = payload.admin;
        state.message = payload.message;
        toast.success(state.message);
      })
      .addCase(getAdmin.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })

      // delete admin promises
      .addCase(deleteAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAdmin.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        toast.success(state.message);
      })
      .addCase(deleteAdmin.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })

      // update admin promises
      .addCase(updateAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAdmin.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.admin = payload.admin;
        state.message = payload.message;
        toast.success(state.message);
      })
      .addCase(updateAdmin.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      });
  },
});

export default adminSlice.reducer;
