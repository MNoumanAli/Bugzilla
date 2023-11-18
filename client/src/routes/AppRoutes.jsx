import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landingPage/LandingPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../pages/homePage/HomePage";
import ProjectDetailPage from "../pages/projectDetailPage/ProjectDetailPage";
import EditProfilePage from "../pages/editProfilePage/EditProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/forget-password"
        element={<EditProfilePage type="forget" />}
      />
      <Route
        path="/project/:id"
        element={
          <PrivateRoute>
            <ProjectDetailPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/:id/edit"
        element={
          <PrivateRoute>
            <EditProfilePage type="edit" />
          </PrivateRoute>
        }
      />
      <Route
        path="/reset-password/:id/:token"
        element={<EditProfilePage type="reset" />}
      />
    </Routes>
  );
};

export default AppRoutes;
