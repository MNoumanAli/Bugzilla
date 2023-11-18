import { Navigate } from "react-router-dom";
import { getLoggedUser } from "../utils/user";

const PrivateRoute = ({ children }) => {
  return getLoggedUser() ? children : <Navigate to="/" />;
};
export default PrivateRoute;
