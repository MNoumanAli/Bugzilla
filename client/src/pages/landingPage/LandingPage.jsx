import "./landingPage.css";
import bug from "../../assets/bug.svg";
import { useState } from "react";
import Form from "../../components/form/Form";
import Navbar from "../../components/navbar/Navbar";

const LandingPage = () => {
  const [loginForm, setLoginForm] = useState(true);
  return (
    <div className="landing-page-container">
      <Navbar setLoginForm={setLoginForm} loginForm={loginForm} />
      <div className="landing-page-lower">
        <div className="lpl-left">
          <div>
            <p className="welcome-text">Welcome</p>
            <p className="back-text">
              Back{" "}
              <span>
                <img src={bug} alt="" />
              </span>
            </p>
            <small>Uncover Bugs, Deliver Perfection.</small>
          </div>
        </div>
        <Form loginForm={loginForm} />
      </div>
    </div>
  );
};
export default LandingPage;
