import {
  addUserToProject,
  createProject,
  deleteProject,
  fetchAllProjects,
  getDeveloperProjects,
  removeUserFromProject,
  updateProject,
} from "../api/post";
import { notifyError, notifySuccess } from "../utils/toast";
import {
  ADD_DEVELOPER,
  ADD_NEW_PROJECT,
  ADD_PROJECT,
  ADD_QA,
  DELETE_PROJECT,
  EDIT_PROJECT,
} from "../constants";

export const createProjectAction = (project) => {
  return async (dispatch) => {
    try {
      const { data } = await createProject(project);
      dispatch({
        type: ADD_NEW_PROJECT,
        payload: {
          id: data._id,
          QA: data.QA,
          developer: data.developer,
          bugs: data.bugs,
          title: data.title,
          description: data.description,
          owner: data.owner,
        },
      });
    } catch (error) {
      notifyError("Project not uploaded");
    }
  };
};

export const getAllProjectsAction = (role, id) => {
  return async (dispatch) => {
    try {
      const { data } =
        role !== "Developer"
          ? await fetchAllProjects()
          : await getDeveloperProjects(id);
      dispatch({
        type: ADD_PROJECT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      notifyError("Project Fetch Failed");
    }
  };
};

export const deleteProjectAction = (id) => {
  return async (dispatch) => {
    try {
      await deleteProject(id);
      dispatch({
        type: DELETE_PROJECT,
        payload: id,
      });
      notifySuccess("Project Delete Successful.");
    } catch (error) {
      notifyError("Project Deletion Failed");
    }
  };
};

export const updateProjectAction = (data, id) => {
  return async (dispatch) => {
    try {
      await updateProject(data, id);
      dispatch({
        type: EDIT_PROJECT,
        payload: {
          id: id,
          title: data.title,
          description: data.description,
        },
      });
    } catch (error) {}
  };
};

export const addUserProjectAction = (userId, projecId, role) => {
  return async (dispatch) => {
    try {
      const { data } = await addUserToProject(userId, projecId);
      dispatch({
        type: role === "developer" ? ADD_DEVELOPER : ADD_QA,
        payload: data,
      });
    } catch (error) {
      notifyError("Error while Adding.");
    }
  };
};

export const removeUserProjectAction = (userId, projectId, role) => {
  return async (dispatch) => {
    try {
      const { data } = await removeUserFromProject(userId, projectId);
      dispatch({
        type: role === "developer" ? ADD_DEVELOPER : ADD_QA,
        payload: data,
      });
    } catch (error) {
      notifyError("Error while Adding.");
    }
  };
};
