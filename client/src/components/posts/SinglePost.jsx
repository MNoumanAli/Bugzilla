import React, { useContext } from "react";
import edit from "../../assets/edit.svg";
import remove from "../../assets/remove.svg";
import { useDispatch } from "react-redux";
import { deleteProjectAction } from "../../actions/projectActions";
import { notifyError } from "../../utils/toast";
import { HomeContext } from "../../context/homeContext/HomeContext";
import { useNavigate } from "react-router-dom";

export default function SinglePost({ title, description, id, owner }) {
  const dispatch = useDispatch();
  const { id: userId, setEdit, checkEdit, setModel } = useContext(HomeContext);
  const navigate = useNavigate();
  const deleteProject = () => {
    try {
      if (checkEdit) {
        notifyError("Can't DELETE : This post is in Edit mode.");
      } else dispatch(deleteProjectAction(id));
    } catch (error) {
      notifyError("Project Deletion Failed");
    }
  };
  const editPost = () => {
    setEdit({ title, description, id });
  };
  const showUsers = (user) => {
    const scrollTop = document.documentElement.scrollTop;
    setModel([user, id, scrollTop]);
  };
  const showDetail = () => {
    navigate(`/project/${id}`);
  };
  return (
    <div className="single-post-container">
      <div className="spc-upper">
        <p>{title}</p>
        {userId === owner ? (
          <div className="icons">
            <img src={edit} onClick={editPost} alt="edit-icon" />
            <img src={remove} onClick={deleteProject} alt="delete-icon" />
          </div>
        ) : null}
      </div>
      <div className="spc-center">
        <p>{description}</p>
      </div>
      <div className="spc-lower">
        <p onClick={showDetail} className="project-detail-btn">
          Show Detail
        </p>
        {userId === owner ? (
          <div>
            <p onClick={() => showUsers("developer")}>Edit Developers</p>
            <p onClick={() => showUsers("qa")}>Edit QA</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
