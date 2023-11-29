import { useFormik } from "formik";
import { singupSchema } from "../../schemas/schema";
import { signup } from "../../api";
import Select from "react-select";
import { notifyError, notifySuccess } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { setLoggedUser } from "../../utils/user";
import { ROLE_OPTIONS } from "../../constants";

const SignupForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      role: "",
    },
    validationSchema: singupSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        const res = await signup({...values, role : values.role.label});
        // set user data to local storage
        setLoggedUser(res.data);
        notifySuccess("Account Created");
        navigate("/home");
      } catch (error) {
        if (error.response) {
          const data = error.response?.data;
          const fields = Object.keys(data);
          setFieldError(`${fields[0]}`, `${data[fields[0]]}`);
        } else {
          notifyError("Error while Creating Account.");
        }
      }
    },
  });
  return (
    <div className="login-form-container">
      <p>Create New Account</p>
      <div className="login-form signup-form">
        <div className="name-role">
          <div className="name-field">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <p className="form-error">{formik.errors.name}</p>
            ) : null}
          </div>
          <div className="role-field">
            <Select
              className="role-options"
              value={formik.values.role}
              name="role"
              options={ROLE_OPTIONS}
              placeholder="Your Role"
              onChange={(value) => formik.setFieldValue("role", value)}
              onBlur={formik.handleBlur}
            />
            {formik.errors.role && formik.touched['react-select-3-input'] ? (
              <p className="form-error">{formik.errors.role}</p>
            ) : null}
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="form-error">{formik.errors.email}</p>
          ) : null}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="form-error">{formik.errors.password}</p>
          ) : null}
        </div>
        <button
          className="login-btn"
          type="submit"
          onClick={formik.handleSubmit}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
export default SignupForm;
