import { API } from "./index.js";

export const fetchAllUsers = async (role) =>
  await API.get(`/user/?role=${role}`);

export const changePassword = async (id, data) =>
  await API.patch(`/user/${id}/edit/password`, data);
export const forgetPassword = async (data) =>
  await API.post("/forget-password", data);
export const resetPassword = async (data, id, token) =>
  await API.patch(`/reset-password/${id}/${token}`, data);
