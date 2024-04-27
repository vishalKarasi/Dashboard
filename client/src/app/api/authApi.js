import { cookieAxios, publicAxios } from "./serverApi.js";

export const registerApi = (credential) => {
  return publicAxios.post("/auth/register", credential);
};

export const loginApi = (credential) => {
  return cookieAxios.post("/auth/login", credential);
};

export const logoutApi = () => {
  return cookieAxios.post("/auth/logout");
};

export const refreshTokenApi = () => {
  return cookieAxios.get("/auth/refresh");
};
