import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email({ email: "Shoud be valid email" })
    .required({ email: "Email ia required" }),
  password: Yup.string().required({ password: "Password is required" }),
});

export default loginSchema;
