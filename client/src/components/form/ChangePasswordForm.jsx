import React from "react";
import { useFormik } from "formik";
import { passwordSchema } from "../../schemas/schema";
import { changePassword } from "../../api/user";
import { useParams } from "react-router-dom";
import { notifySuccess, notifyError } from "../../utils/toast";

const ChangePasswordForm = () => {
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      conformPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: async (values, { setFieldError, resetForm }) => {
      try {
        if (values.newPassword !== values.conformPassword) {
          setFieldError("conformPassword", "Password not match.");
        } else {
          await changePassword(id, {
            oldPassword: values.currentPassword,
            newPassword: values.conformPassword,
          });
          resetForm();
          notifySuccess("Password change Successfully.");
        }
      } catch (error) {
        if (error.response) {
          const data = error.response?.data;
          const fields = Object.keys(data);
          setFieldError(`${fields[0]}`, `${data[fields[0]]}`);
        } else {
          notifyError("Error while updating Password.");
        }
      }
    },
  });
  return (
    <div className="password-form-body">
      <div className="fields">
        <input
          type="password"
          name="currentPassword"
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="current password"
        />
        <p className="form-error">
          {formik.errors.currentPassword && formik.touched.currentPassword
            ? formik.errors.currentPassword
            : ""}
        </p>
      </div>
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

export default ChangePasswordForm;
