import express from "express";
import {
  changePassword,
  forgetPassword,
  getUsers,
  login,
  resetPassword,
  signup,
} from "../controllers/userController.js";
import validateSchema from "../middlewares/validateSchema.js";
import loginSchema from "../schema/loginSchema.js";
import signUpSchema from "../schema/signUpSchema.js";
import {
  roleAuthorization,
  authorization,
} from "../middlewares/authorization.js";

const userRouter = express.Router();
const authorizaManager = roleAuthorization("Manager");
const validateLoginSchema = validateSchema(loginSchema);
const validateSignUpSchema = validateSchema(signUpSchema);
const authorizeManager = roleAuthorization("Manager");
userRouter.post("/forget-password", forgetPassword);
userRouter.post("/login", validateLoginSchema, login);
userRouter.post("/signup", validateSignUpSchema, signup);
userRouter.get("/user", authorization, authorizaManager, getUsers);
userRouter.patch("/user/:id/edit/password", authorization, changePassword);
userRouter.patch("/reset-password/:id/:token", resetPassword);
export default userRouter;
