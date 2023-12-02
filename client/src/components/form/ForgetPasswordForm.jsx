import { useFormik } from "formik";
import * as Yup from "yup";
import { notifySuccess, notifyError } from "../../utils/toast";
import { forgetPassword } from "../../api/user";

const ForgetPasswordForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Should be email").required("Required"),
    }),
    onSubmit: async (values, { setFieldError, resetForm }) => {
      try {
        await forgetPassword({ email: values.email });
        resetForm();
        notifySuccess("Check your Email.");
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
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="your email"
        />
        <p className="form-error">
          {formik.errors.email && formik.touched.email
            ? formik.errors.email
            : ""}
        </p>
      </div>
      <div>
        <button type="submit" onClick={formik.handleSubmit}>
          Send Email
        </button>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
