import { privateAxios } from "./serverApi";

export const getAdminApi = (id) => {
  return privateAxios.get(`/admin/${id}`);
};

export const deleteAdminApi = (id) => {
  return privateAxios.delete(`/admin/${id}`);
};

export const updateAdminApi = (id, credential) => {
  return privateAxios.patch(`/admin/${id}`, credential);
};
