import React from "react";
import userPic from "../../assets/userPic.svg";
import ChangePasswordForm from "./ChangePasswordForm";
import ForgetPasswordForm from "./ForgetPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";

const EditProfileForm = ({ type }) => {
  return (
    <div className="password-form-container">
      <div className="password-form-upper">
        <p>
          {type === "edit"
            ? "Change Password"
            : type === "forget"
            ? "Forget Password"
            : "Reset Password"}
        </p>
        <img src={userPic} alt="user" />
      </div>
      {type === "edit" ? (
        <ChangePasswordForm />
      ) : type === "forget" ? (
        <ForgetPasswordForm />
      ) : (
        <ResetPasswordForm />
      )}
    </div>
  );
};
export default EditProfileForm;
