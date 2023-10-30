import user from "../models/user.js";
import bcrypt from "bcrypt";

export const findUserService = async (email) => {
  try {
    const foundUser = await user.findOne({ email: email });
    return foundUser;
  } catch (error) {
    throw error;
  }
};

export const findUserById = async (id) => {
  try {
    const foundUser = await user.findById({ _id: id });
    return foundUser;
  } catch (error) {
    throw error;
  }
};

export const createUserService = async (data) => {
  try {
    const newUser = new user({ ...data });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

export const getUsersService = async (role) => {
  try {
    let data = await user.find({ role: role });
    data = data.map((item) => {
      return {
        id: item._id,
        name: item.name,
        projects: item.projects,
        role: item.role,
      };
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const checkPasswordService = async (password, id) => {
  const foundUser = await user.findById({ _id: id });
  const hashedPassword = await bcrypt.compare(password, foundUser.password);
  if (!hashedPassword) return true;
  else return false;
};

export const changePasswordService = async (data) => {
  try {
    await user.findByIdAndUpdate(
      { _id: data.userId },
      { password: data.password }
    );
  } catch (error) {
    throw error;
  }
};
