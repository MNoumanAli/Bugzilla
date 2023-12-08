import React from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/arrow.svg";
import "./editProfilePage.css";
import EditProfileForm from "../../components/form/EditPageForm";

const EditProfilePage = ({ type }) => {
  const navigate = useNavigate();
  return (
    <div className="edit-profile-container">
      <div className="edit-profile-header">
        {type !== "reset" && (
          <img src={arrow} onClick={() => navigate("/home")} />
        )}
        {type === "edit" ? <p>Edit Profile</p> : null}
        {type === "reset" ? <p>Reset Password</p> : null}
        {type === "forget" ? <p>Forget Password</p> : null}
      </div>
      <div className="edit-profile-body">
        <EditProfileForm type={type} />
      </div>
    </div>
  );
};

export default EditProfilePage;
