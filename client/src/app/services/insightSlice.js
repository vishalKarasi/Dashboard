import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getInsightsApi,
  getFilteredInsightsApi,
  getGraphicApi,
} from "../api/insightApi";
import { BASE_URL } from "../api/serverApi";
import { CacheService } from "./caching";

const initialState = {
  insights: [],
  graphics: [],
  message: "",
  status: "idle",
};

export const getInsights = createAsyncThunk("insights", async (pagination) => {
  try {
    const cacheKey = `${BASE_URL}/insights/${JSON.stringify(pagination)}`;
    const cacheInsights = CacheService.get(cacheKey);
    if (cacheInsights) return cacheInsights;
    const { data } = await getInsightsApi(pagination);
    CacheService.set(cacheKey, data);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getFilteredInsights = createAsyncThunk(
  "insights/filters",
  async (filters) => {
    try {
      const cacheKey = `${BASE_URL}/insights/filters/${JSON.stringify(
        filters
      )}`;
      const cacheFilteredInsight = CacheService.get(cacheKey);
      if (cacheFilteredInsight) return cacheFilteredInsight;
      const { data } = await getFilteredInsightsApi(filters);
      CacheService.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getGraphicsData = createAsyncThunk(
  "insights/graphics",
  async () => {
    try {
      const cacheKey = `${BASE_URL}/insights/graphics`;
      const cacheGraphic = CacheService.get(cacheKey);
      if (cacheGraphic) return cacheGraphic;
      const { data } = await getGraphicApi();
      CacheService.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const insightSlice = createSlice({
  name: "insight",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getInsights.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getInsights.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.insights = payload.data;
      })

      .addCase(getInsights.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })

      .addCase(getFilteredInsights.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getFilteredInsights.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.insights = payload.data;
      })

      .addCase(getFilteredInsights.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })

      .addCase(getGraphicsData.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getGraphicsData.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        state.graphics = payload.data;
      })

      .addCase(getGraphicsData.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      });
  },
});

export default insightSlice.reducer;
