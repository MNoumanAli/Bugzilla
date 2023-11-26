import { ADD_DEVELOPER, ADD_QA } from "../constants";

const userReducer = (state = { developer: [], qa: [] }, action) => {
  switch (action.type) {
    case ADD_DEVELOPER:
      return { ...state, developer: action.payload };
    case ADD_QA:
      return { ...state, qa: action.payload };
    default:
      return state;
  }
};

export default userReducer;
