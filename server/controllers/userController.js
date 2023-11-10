import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  changePasswordService,
  checkPasswordService,
  createUserService,
  findUserById,
  findUserService,
  getUsersService,
} from "../services/userServices.js";
import transporter from "../config/transporter.js";

// Login Controller
export const login = async (req, res) => {
  try {
    const foundUser = await findUserService(req.body.email);
    // User Not Found
    if (!foundUser) {
      return res.status(404).send({ email: "Invalid Email - User not found" });
    }
    const hashedPassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    // Incorrect Password
    if (!hashedPassword) {
      return res.status(401).send({ password: "Incorrect Password" });
    }
    // Generate JWT token
    const token = jwt.sign(
      { name: foundUser.name, id: foundUser._id, role: foundUser.role },
      process.env.ACCESS_TOKEN
    );
    res.status(200).send({
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      id: foundUser._id,
      accessToken: token,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Signup Controller
export const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const savedUser = await createUserService({
      ...req.body,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { name: savedUser.name, id: savedUser._id, role: savedUser.role },
      process.env.ACCESS_TOKEN
    );
    res.status(200).send({
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      id: savedUser._id,
      accessToken: token,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    if (req.query) {
      const data = await getUsersService(req.query.role);
      res.status(200).send(data);
    } else {
      const data = await getUsersService();
      res.status(200).send(data);
    }
  } catch (error) {
    res
      .status(400)
      .send({ Message: "Error fetching Users", error: error.Message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const check = await checkPasswordService(req.body.oldPassword, req.userId);
    if (check) {
      return res.status(401).send({ currentPassword: "Incorrect Password" });
    }
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    await changePasswordService({
      userId: req.userId,
      password: hashedPassword,
    });
    res.status(200).send({ Message: "Password change Successful." });
  } catch (error) {
    res.status(400).send({ Message: "Error - Password not changed" });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const foundUser = await findUserService(req.body.email);
    if (!foundUser) {
      return res.status(400).send({ email: "User not found" });
    }
    const secret = process.env.ACCESS_TOKEN + foundUser.password;
    const payload = { id: foundUser._id, email: foundUser.email, secret };
    const token = jwt.sign(payload, secret, { expiresIn: "10m" });
    const link = `http://localhost:3000/reset-password/${foundUser._id}/${token}`;
    const mailOptions = {
      from: process.env.EMAIL,
      to: foundUser.email,
      subject: "Bugzilla - Forget Password",
      text: link,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw error;
      } else {
        return res.send("Send Succeffully");
      }
    });
    res.send("send Successfully.");
  } catch (error) {
    res.send("Error occure.");
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const foundUser = await findUserById(id);
    if (!foundUser) {
      return res.status(404).send({ Message: "Unauthorized." });
    }
    const secret = process.env.ACCESS_TOKEN + foundUser.password;
    const user = jwt.verify(token, secret);
    if (!user) {
      return res.status(400).send({ Message: "Your token has been expired." });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await changePasswordService({
      userId: id,
      password: hashedPassword,
    });
    res.status(200).send({ Message: "Password Rest Successfully." });
  } catch (error) {
    res.status(400).send({ Message: "Error Reseting Password." });
  }
};
