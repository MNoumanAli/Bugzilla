import { getAllBugsService } from "../services/bugServices.js";
import {
  addUserToProjectService,
  createProjectService,
  deleteProjectService,
  getAllProjectsService,
  getDeveloperProjectsService,
  getSingleProjectService,
  removeUserFromProjectService,
  updateProjectService,
} from "../services/projectServices.js";

export const getAllProjects = async (req, res) => {
  try {
    const data = await getAllProjectsService();
    res.status(200).send(data);
  } catch (error) {
    res
      .status(400)
      .send({ Meesage: "Error getting All projects", error: error.Message });
  }
};

export const getDeveloperProjects = async (req, res) => {
  try {
    const data = await getDeveloperProjectsService(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    res
      .status(400)
      .send({ Meesage: "Error getting All projects", error: error.Message });
  }
};

export const getSingleProject = async (req, res) => {
  try {
    const data = await getSingleProjectService(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    res
      .status(400)
      .send({ Message: "Error Getting project.", error: error.Message });
  }
};

export const getProjectBugs = async (req, res) => {
  try {
    const data = await getAllBugsService(req.params.id);
    if (!data) {
      return res.status({ Message: "Request Not Completed." });
    }
    res.status(200).send(data);
  } catch (error) {
    return res.status(400).send({ Message: "Error while fetching bugs." });
  }
};
export const createProject = async (req, res) => {
  try {
    const savedProject = await createProjectService({
      ...req.body,
      owner: req.userId,
    });
    res.send(savedProject);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteProject = async (req, res) => {
  try {
    await deleteProjectService(req.params.id);
    res.status(200).send({ Message: "Project Delete Successful." });
  } catch (error) {
    res
      .status(400)
      .send({ Message: "Error - Unsuccessful Deletion", error: error.Message });
  }
};

export const updateProject = async (req, res) => {
  try {
    updateProjectService(req.body, req.params.id);
    // update developer,QA, bug fields -> optional ( depend on frontend approach)
    res.status(200).send({ Message: "Update Successful" });
  } catch (error) {
    res.status({ Message: "Error while Updating", error: error.Message });
  }
};

export const addUserToProject = async (req, res) => {
  try {
    const data = await addUserToProjectService(
      req.params.userId,
      req.params.id
    );
    res.status(200).send(data);
  } catch (error) {
    res.status({ Message: "Error while Adding User", error: error.Message });
  }
};

export const removeUserFromProject = async (req, res) => {
  try {
    const data = await removeUserFromProjectService(
      req.params.userId,
      req.params.id
    );
    res.status(200).send(data);
  } catch (error) {
    res.status({ Message: "Error while Adding User", error: error.Message });
  }
};
