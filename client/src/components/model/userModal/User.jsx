import React, { useState } from "react";
import { useDispatch } from "react-redux";
import userPic from "../../../assets/userPic.svg";
import removeBtn from "../../../assets/removeBtn.svg";
import addBtn from "../../../assets/addBtn.svg";
import {
  addUserProjectAction,
  removeUserProjectAction,
} from "../../../actions/projectActions";

export default function User({ name, id, projectId, isPart, userRole }) {
  const [projectPart, setProjectPart] = useState(isPart);
  const dispatch = useDispatch();
  const handleChange = () => {
    if (projectPart) {
      dispatch(removeUserProjectAction(id, projectId, userRole));
    } else {
      dispatch(addUserProjectAction(id, projectId, userRole));
    }
    setProjectPart((prev) => !prev);
  };
  return (
    <div className="user-container">
      <div className="user-left">
        <img src={userPic} alt="" />
        <p>{name}</p>
      </div>
      <add className="user-right">
        <img
          onClick={handleChange}
          src={projectPart ? removeBtn : addBtn}
        ></img>
      </add>
    </div>
  );
}
