import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import "./createProject.css";
import { projectSchema } from "../../schemas/schema";
import { notifyError, notifySuccess } from "../../utils/toast";
import { useDispatch } from "react-redux";
import {
  createProjectAction,
  updateProjectAction,
} from "../../actions/projectActions";
import { HomeContext } from "../../context/homeContext/HomeContext";

const CreateProject = () => {
  const { checkEdit, setEdit } = useContext(HomeContext);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: projectSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (checkEdit) {
          dispatch(updateProjectAction(values, checkEdit.id));

          setEdit(false);
        } else {
          dispatch(createProjectAction(values));
          notifySuccess("Project Uploaded.");
        }
        resetForm();
      } catch (error) {
        notifyError("Project not upload.");
      }
    },
  });
  useEffect(() => {
    if (checkEdit) {
      formik.setValues({
        title: checkEdit.title,
        description: checkEdit.description,
      });
    } else {
      formik.resetForm();
    }
  }, [checkEdit]);
  return (
    <div className="create-project-container">
      <div className="create-project-upper">
        <p>Create Project</p>
      </div>
      <div className="create-project-center">
        <div className="title-div">
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Title"
          />
          {formik.errors.title && formik.touched.title ? (
            <p className="input-error">{formik.errors.title}</p>
          ) : null}
        </div>
        <div className="desc-div">
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="description"
          />
          {formik.errors.description && formik.touched.description ? (
            <p className="input-error">{formik.errors.description}</p>
          ) : null}
        </div>
      </div>
      <div className="create-project-lower" onClick={formik.handleSubmit}>
        <p>{checkEdit ? "Update" : "Upload"}</p>
      </div>
    </div>
  );
};

export default CreateProject;
