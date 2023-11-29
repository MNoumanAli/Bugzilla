import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/schema";
import { login } from "../../api";
import { setLoggedUser } from "../../utils/user";
import { notifyError, notifySuccess } from "../../utils/toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        const res = await login(values);
        // set user data to local storage
        setLoggedUser(res.data);
        notifySuccess("Signin Successful.");
        navigate("/home");
      } catch (error) {
        if (error.response) {
          const data = error.response?.data;
          const fields = Object.keys(data);
          setFieldError(`${fields[0]}`, `${data[fields[0]]}`);
        } else {
          notifyError("Error while Signing In.");
        }
      }
    },
  });
  return (
    <div className="login-form-container">
      <p>Your Account</p>
      <div className="login-form">
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
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
