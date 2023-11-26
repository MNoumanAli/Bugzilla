import { fetchAllUsers } from "../api/user";
import { ADD_DEVELOPER, ADD_QA } from "../constants";
import { notifyError } from "../utils/toast";

export const fetchUser = (role) => {
  return async (dispatch) => {
    try {
      const res = await fetchAllUsers(role);
      dispatch({
        type: role === "Developer" ? ADD_DEVELOPER : ADD_QA,
        payload: res.data,
      });
    } catch (error) {
      notifyError("Error Fetching Users.");
    }
  };
};
