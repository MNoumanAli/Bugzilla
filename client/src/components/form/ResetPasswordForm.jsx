import React from "react";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../../schemas/schema";
import { resetPassword } from "../../api/user";
import { useNavigate, useParams } from "react-router-dom";
import { notifySuccess, notifyError } from "../../utils/toast";

const ResetPasswordForm = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      conformPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, { setFieldError, resetForm }) => {
      try {
        await resetPassword({ password: values.conformPassword }, id, token);
        resetForm();
        notifySuccess("Password change Successfully.");
        navigate("/");
      } catch (error) {
        notifyError(error.response.data.Message);
      }
    },
  });
  return (
    <div className="password-form-body">
      <div className="fields">
        <input
          type="password"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="new password"
        />
        <p className="form-error">
          {formik.errors.newPassword && formik.touched.newPassword
            ? formik.errors.newPassword
            : ""}
        </p>
      </div>
      <div className="fields">
        <input
          type="password"
          name="conformPassword"
          value={formik.values.conformPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="conform password"
        />
        <p className="form-error">
          {formik.errors.conformPassword && formik.touched.conformPassword
            ? formik.errors.conformPassword
            : ""}
        </p>
      </div>
      <div>
        <button type="submit" onClick={formik.handleSubmit}>
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
