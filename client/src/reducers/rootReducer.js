import projectReducer from "./projectReducer";
import userReducer from "./userReducer";
import bugReducer from "./bugReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  projectReducer,
  userReducer,
  bugReducer,
});
