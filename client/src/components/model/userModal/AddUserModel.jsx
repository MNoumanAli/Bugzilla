import React, { useContext, useEffect } from "react";
import "./model.css";
import { HomeContext } from "../../../context/homeContext/HomeContext";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";

const AddUserModel = () => {
  const { checkModel, setModel } = useContext(HomeContext); // checkModel[0] -> Role , checkModel[1] -> projectId
  const allUsers = useSelector((data) => data.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    // prevent scrolling
    checkModel
      ? (window.document.body.style.overflow = "hidden")
      : (window.document.body.style.overflow = "unset");
  }, [checkModel]);
  const closeModel = () => {
    setModel(false);
  };
  // by default hide Model
  if (!checkModel) {
    return <></>;
  }
  return (
    <div className="model-container" style={{ top: checkModel[2] }}>
      <div className="model-upper">
        <span onClick={closeModel}>X</span>
      </div>
      <div className="model-lower">
        <div className="model-body">
          <p className="model-title">
            {checkModel[0] === "developer" ? "Add Developers" : "Add QAs"}
          </p>
          <div className="model-content">
            {allUsers?.[
              checkModel[0] === "developer" ? "developer" : "qa"
            ]?.map((item) => {
              const isPart = item.projects?.includes(checkModel[1]);
              return (
                <User
                  name={item.name}
                  id={item.id}
                  userRole={checkModel[0]}
                  projectId={checkModel[1]}
                  isPart={isPart}
                />
              );
            })}
          </div>
          <p className="add-btn" onClick={closeModel}>
            Done
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddUserModel;
