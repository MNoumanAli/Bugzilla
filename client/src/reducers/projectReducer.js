import {
  ADD_NEW_PROJECT,
  ADD_PROJECT,
  DELETE_PROJECT,
  EDIT_PROJECT,
} from "../constants";

const deleteProject = (state, id) => {
  return state.filter((item) => item.id !== id);
};
const editProject = (state, data) => {
  const updatedData = state.map((item) =>
    item.id === data.id
      ? { ...item, title: data.title, description: data.description }
      : item
  );
  return updatedData;
};
const projectReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return [...action.payload];
    case ADD_NEW_PROJECT:
      return [action.payload, ...state];
    case DELETE_PROJECT:
      return deleteProject(state, action.payload);
    case EDIT_PROJECT:
      return editProject(state, action.payload);
    default:
      return state;
  }
};
export default projectReducer;
