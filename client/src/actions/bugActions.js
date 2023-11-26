import { createBug, getProjectBugs, updateProjectBug } from "../api/bug";
import { ADD_BUG, ADD_NEW_BUG, UPDATE_BUG_STATUS } from "../constants";
import { notifyError } from "../utils/toast";

export const createBugAction = (bug, projectId) => {
  return async (dispatch) => {
    try {
      const { data } = await createBug(bug, projectId);
      dispatch({
        type: ADD_NEW_BUG,
        payload: data,
      });
    } catch (error) {
      notifyError("Error Creating Bug");
    }
  };
};

export const getProjectBugsAction = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await getProjectBugs(id);
      dispatch({
        type: ADD_BUG,
        payload: data,
      });
    } catch (error) {
      notifyError("Error fetching Bugs");
    }
  };
};

export const updateBugAction = (status, bugId, developer) => {
  return async (dispatch) => {
    try {
      await updateProjectBug({ status: status, developer: developer }, bugId);
      dispatch({
        type: UPDATE_BUG_STATUS,
        payload: { status, bugId, developer },
      });
    } catch (error) {
      notifyError("Error Updating.");
    }
  };
};
