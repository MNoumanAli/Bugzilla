import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string().required("Required"),
});

export const singupSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Too Short")
    .max(20, "Too Long")
    .required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be 6 character long")
    .required("Required"),
  role: Yup.object().required("Please Select One"),
});

export const projectSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  description: Yup.string().required("description is required"),
});

export const bugSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  status: Yup.object().required("Required"),
  type: Yup.string().required("Required"),
  deadline: Yup.date().required("Required"),
});

export const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, "Password must be 6 character long")
    .required("Required"),
  newPassword: Yup.string()
    .min(6, "Password must be 6 character long")
    .required("Required"),
  conformPassword: Yup.string()
    .min(6, "Password must be 6 character long")
    .required("Required"),
});

export const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Password must be 6 character long")
    .required("Required"),
  conformPassword: Yup.string()
    .min(6, "Password must be 6 character long")
    .required("Required"),
});
