import Yup from "yup";
import { roles } from "../constants.js";

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, { name: "name atleast 5 character long" })
    .required({ name: "User name is required" }),
  email: Yup.string()
    .email({ email: "Shoud be valid email" })
    .required({ email: "Email ia required" }),
  password: Yup.string()
    .min(6, { password: "Password atleast 6 character long" })
    .required({ password: "Password is required" }),
  role: Yup.string()
    .oneOf(roles, { role: "Role Not Allowed" })
    .required({ role: "Role Required" }),
});
export default signUpSchema;
