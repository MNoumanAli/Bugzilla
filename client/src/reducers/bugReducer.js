import { ADD_BUG, ADD_NEW_BUG, UPDATE_BUG_STATUS } from "../constants";

const updateStatus = (state, status, id, dev) => {
  const updated = state.map((item) => {
    if (item._id === id) {
      item.status = status;
      item.developer = dev;
    }
    return item;
  });
  return updated;
};

const bugReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_BUG:
      return [...action.payload];
    case ADD_NEW_BUG:
      return [action.payload, ...state];
    case UPDATE_BUG_STATUS:
      return updateStatus(
        state,
        action.payload.status,
        action.payload.bugId,
        action.payload.developer
      );
    default:
      return state;
  }
};
export default bugReducer;
