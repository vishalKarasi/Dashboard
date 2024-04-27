import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginApi,
  logoutApi,
  refreshTokenApi,
  registerApi,
} from "@app/api/authApi.js";
import { toast } from "react-toastify";

const initialState = {
  id: null,
  accessToken: null,
  isRegister: false,
  message: "",
  status: "idle",
};

export const register = createAsyncThunk(
  "auth/register",
  async (credential) => {
    try {
      const { data } = await registerApi(credential);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (credential) => {
  try {
    const { data } = await loginApi(credential);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const { data } = await logoutApi();
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  try {
    const { data } = await refreshTokenApi();
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleForm: (state) => {
      state.isRegister = !state.isRegister;
    },
  },

  extraReducers: (builder) => {
    builder
      // register promises
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.isRegister = true;
        state.message = payload.message;
        toast.success(state.message);
      })
      .addCase(register.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })
      // login promises
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.id = payload.id;
        state.accessToken = payload.accessToken;
        state.message = payload.message;
        toast.success(state.message);
      })
      .addCase(login.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })
      // refresh promises
      .addCase(refreshToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.id = payload.id;
        state.accessToken = payload.accessToken;
      })
      .addCase(refreshToken.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
      })

      // logout promises
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.accessToken = null;
        state.message = payload.message;
        state.status = "success";
        toast.success(state.message);
      })
      .addCase(logout.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      });
  },
});

export const { toggleForm } = authSlice.actions;
export default authSlice.reducer;
