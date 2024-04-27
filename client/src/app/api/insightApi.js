import { publicAxios } from "./serverApi.js";

export const getInsightsApi = (pagination) => {
  return publicAxios.get("/insights", { params: pagination });
};

export const getFilteredInsightsApi = (filters) => {
  return publicAxios.get("/insights/filters", { params: filters });
};

export const getGraphicApi = () => {
  return publicAxios.get("/insights/graphics");
};
