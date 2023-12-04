import { useFormik } from "formik";
import "./createBug.css";
import { bugSchema } from "../../schemas/schema";
import Select from "react-select";
import { BUG_STATUS, FEATURE_STATUS } from "../../constants";
import { useDispatch } from "react-redux";
import { createBugAction } from "../../actions/bugActions";
import { useParams } from "react-router-dom";
import { useRef } from "react";

const CreateBug = () => {
  const dispatch = useDispatch();
  const { id: projectId } = useParams();
  const ref = useRef();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      type: "bug",
      deadline: "",
      status: null,
      screenshot: "",
    },
    validationSchema: bugSchema,
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("screenshot", values.screenshot);
      formData.append("status", values.status.label);
      formData.append("type", values.type);
      formData.append("deadline", values.deadline);
      dispatch(createBugAction(formData, projectId));
      // reset choosed image and form Data
      ref.current.value = "";
      resetForm();
    },
  });
  return (
    <div className="create-bug-container">
      <div>
        <div className="input-div">
          <input
            type="text"
            placeholder="title"
            value={formik.values.title}
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.title && formik.touched.title ? (
            <p className="form-error">{formik.errors.title}</p>
          ) : null}
        </div>
        <div className="textarea-div">
          <textarea
            placeholder="description"
            value={formik.values.description}
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="radio-div">
          <div>
            <label htmlFor="feature">Feature</label>
            <input
              type="radio"
              name="type"
              value="feature"
              onChange={formik.handleChange}
              checked={formik.values.type === "feature"}
            />
          </div>
          <div>
            <label htmlFor="bug">Bug</label>
            <input
              type="radio"
              value="bug"
              onChange={formik.handleChange}
              name="type"
              checked={formik.values.type === "bug"}
            />
          </div>
        </div>
        <div className="input-div">
          <Select
            value={formik.values.status}
            name="status"
            options={formik.values.type === "bug" ? BUG_STATUS : FEATURE_STATUS}
            placeholder="Select status"
            onChange={(value) => formik.setFieldValue("status", value)}
            onBlur={formik.handleBlur}
          />
          {formik.errors.status && formik.touched['react-select-3-input'] ? (
            <p className="form-error">{formik.errors.status}</p>
          ) : null}
        </div>
        <div className="input-div">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            value={formik.values.deadline}
            name="deadline"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.deadline && formik.touched.deadline ? (
            <p className="form-error">{formik.errors.deadline}</p>
          ) : null}
        </div>
        <div className="input-div">
          <label htmlFor="">Screenshoot</label>
          <input
            ref={ref}
            type="file"
            accept=".png, .gif"
            onChange={(e) => {
              formik.setFieldValue("screenshot", e.target.files[0]);
            }}
          />
        </div>
        <div className="button-div">
          <button type="button" onClick={formik.handleSubmit}>
            Create Bug
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateBug;
