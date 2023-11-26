import { API } from "./index.js";

export const createProject = async (data) =>
  await API.post("/project/new", data);

export const fetchAllProjects = async () => await API.get("/project/all");

export const deleteProject = async (id) =>
  await API.delete(`/project/${id}/delete`);

export const updateProject = async (data, id) =>
  await API.patch(`project/${id}/update`, data);

export const addUserToProject = async (userId, id) =>
  await API.patch(`/project/${id}/addUser/${userId}`);

export const removeUserFromProject = async (userId, id) =>
  await API.patch(`/project/${id}/removeUser/${userId}`);

export const getProjectDetail = async (id) => await API.get(`/project/${id}`);

export const getDeveloperProjects = async (id) =>
  await API.get(`/project/developer/${id}`);
