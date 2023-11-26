import { API } from "./index.js";

export const createBug = async (data, id) =>
  await API.post(`/project/${id}/bug/new`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const getProjectBugs = async (id) =>
  await API.get(`/project/${id}/bugs`);
export const updateProjectBug = async (data, bugId) =>
  await API.patch(`/project/bug/${bugId}/update`, data);
