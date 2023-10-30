import bug from "../models/bug.js";

export const getAllBugsService = async (id) => {
  try {
    let data = await bug.find({ project: id });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSingleBugService = async (id) => {
  try {
    const data = await bug.findById({ _id: id });
    return data;
  } catch (error) {
    throw error;
  }
};

export const createBugService = async (data) => {
  try {
    const newBug = new bug({ ...data });
    const savedBug = await newBug.save();
    return savedBug;
  } catch (error) {
    throw error;
  }
};

export const deleteBugService = async (id) => {
  try {
    const deletedBug = await bug.findByIdAndDelete({ _id: id });
  } catch (error) {
    throw error;
  }
};

export const updateBugService = async (data, id) => {
  try {
    const devId = data.developer ? data.developer : null;
    await bug.findByIdAndUpdate({ _id: id }, { ...data, developer: devId });
  } catch (error) {
    throw error;
  }
};
