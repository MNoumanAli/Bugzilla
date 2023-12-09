import React, { useContext } from "react";
import { HomeContext } from "../../context/homeContext/HomeContext";
import profile from "../../assets/profile.svg";
import "./profileCard.css";
import { useNavigate } from "react-router-dom";
const ProfileCard = () => {
  const { name, email, id, role } = useContext(HomeContext);
  const navigate = useNavigate();
  const handleEditBtn = () => {
    navigate(`/user/${id}/edit`);
  };
  return (
    <div className="profile-card">
      <div className="profile-edit">
        <p onClick={handleEditBtn}>Edit Profile</p>
      </div>
      <div className="profile-img">
        <img src={profile} alt="" />
      </div>
      <div className="user-data">
        <div className="profile-name">
          <p>{name}</p>
        </div>
        <div className="profile-email">
          <p>{email}</p>
        </div>
        <div className="profile-role">{role}</div>
      </div>
    </div>
  );
};

export default ProfileCard;
