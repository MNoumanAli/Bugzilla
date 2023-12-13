import React from "react";
import { useNavigate } from "react-router-dom";
import "./homePage.css";
import HomeContextProvider from "../../context/homeContext/HomeContext";
import { deleteLoggedUser, getLoggedUser } from "../../utils/user";
import CreateProject from "../../components/createProject/CreateProject";
import ProfileCard from "../../components/profile/ProfileCard";
import AllPosts from "../../components/posts/AllPosts";
import AddUserModel from "../../components/model/userModal/AddUserModel";

const HomePage = () => {
  const navigate = useNavigate();
  const { role } = getLoggedUser();
  const logout = () => {
    deleteLoggedUser();
    navigate("/");
  };
  return (
    <HomeContextProvider>
      <div className="home-page-container">
        <div className="home-page-left">
          <div className="hpl-upper">
            <p>Bug Zilla</p>
          </div>
          <ProfileCard />
        </div>
        <div className="home-page-center">
          <AllPosts />
        </div>
        <div className="home-page-right">
          <div className="hpr-upper">
            <p className="logout" onClick={logout}>
              Logout
            </p>
          </div>
          {/* Create Project  */}
          {role === "Manager" ? <CreateProject /> : null}
        </div>
      </div>
      <AddUserModel />
    </HomeContextProvider>
  );
};

export default HomePage;
