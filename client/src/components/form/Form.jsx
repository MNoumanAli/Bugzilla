import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Link } from "react-router-dom";
import "./form.css";

const Form = ({ loginForm }) => {
  return (
    <div className="form-container">
      {loginForm ? <LoginForm /> : <SignupForm />}
      <Link to={"/forget-password"}>
        {loginForm ? "Forget Password" : null}
      </Link>
    </div>
  );
};

export default Form;
