import bug from "../models/bug.js";
import project from "../models/project.js";
import user from "../models/user.js";
import { getAllBugsService } from "./bugServices.js";
import { getUsersService } from "./userServices.js";

export const getAllProjectsService = async () => {
  try {
    let data = await project.find();
    data = data.map((item) => ({
      id: item._id,
      QA: item.QA,
      developer: item.developer,
      bugs: item.bugs,
      title: item.title,
      description: item.description,
      owner: item.owner,
    }));

    return data;
  } catch (error) {
    throw error;
  }
};

export const getSingleProjectService = async (id) => {
  try {
    let data = await project.findById({ _id: id });
    const bugs = await getAllBugsService(id);
    data = {
      title: data.title,
      description: data.description,
      bugs: bugs.length,
      developer: data.developer.length,
      QA: data.QA.length,
    };
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProjectBugService = async (id) => {
  try {
    const data = getAllBugsService(id);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getDeveloperProjectsService = async (id) => {
  try {
    let data = await project.find({ developer: { $in: [id] } });
    data = data.map((item) => ({
      id: item._id,
      QA: item.QA,
      developer: item.developer,
      bugs: item.bugs,
      title: item.title,
      description: item.description,
      owner: item.owner,
    }));
    return data;
  } catch (error) {
    throw error;
  }
};

// create new project service
export const createProjectService = async (data) => {
  try {
    const newProject = new project({ ...data });
    const savedProject = await newProject.save();
    return savedProject;
  } catch (error) {
    throw error;
  }
};

// delete project service
export const deleteProjectService = async (id) => {
  try {
    const delProject = await project.deleteOne({ _id: id });
    // update users data who is part of this project
    await user.updateMany({ projects: id }, { $pull: { projects: id } });
    // delete bug associated with this project
    await bug.deleteMany({ projects: id });
  } catch (error) {
    throw error;
  }
};

// update project service
export const updateProjectService = async (data, id) => {
  try {
    const updatedProject = await project.findByIdAndUpdate(
      { _id: id },
      { ...data }
    );
  } catch (error) {
    throw error;
  }
};

export const addUserToProjectService = async (userId, projecId) => {
  try {
    const updatedUser = await user.findByIdAndUpdate(
      { _id: userId },
      { $push: { projects: projecId } },
      { new: true }
    );
    if (updatedUser.role === "Developer")
      await project.findByIdAndUpdate(
        { _id: projecId },
        { $push: { developer: userId } }
      );
    else
      await project.findByIdAndUpdate(
        { _id: projecId },
        { $push: { QA: userId } }
      );
    return getUsersService(updatedUser.role);
  } catch (error) {
    throw error;
  }
};

export const removeUserFromProjectService = async (userId, projecId) => {
  try {
    const updatedUser = await user.findByIdAndUpdate(
      { _id: userId },
      { $pull: { projects: projecId } },
      { new: true }
    );
    if (updatedUser.role === "Developer")
      await project.findByIdAndUpdate(
        { _id: projecId },
        { $pull: { developer: userId } }
      );
    else
      await project.findByIdAndUpdate(
        { _id: projecId },
        { $pull: { QA: userId } }
      );
    return getUsersService(updatedUser.role);
  } catch (error) {
    throw error;
  }
};
