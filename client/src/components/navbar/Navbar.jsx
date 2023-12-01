import "./navbar.css";

const Navbar = ({ setLoginForm, loginForm }) => {
  return (
    <div className="navbar-container">
      <p className="app-title">BugZilla</p>
      <p className="sign-up" onClick={() => setLoginForm((prev) => !prev)}>
        {loginForm ? "Sign Up" : "Login"}
      </p>
    </div>
  );
};
export default Navbar;
