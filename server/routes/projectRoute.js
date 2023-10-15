import express from "express";
import validateSchema from "../middlewares/validateSchema.js";
import {
  addUserToProject,
  createProject,
  deleteProject,
  getAllProjects,
  getDeveloperProjects,
  getProjectBugs,
  getSingleProject,
  removeUserFromProject,
  updateProject,
} from "../controllers/projectController.js";
import {
  authorization,
  roleAuthorization,
} from "../middlewares/authorization.js";
import projectSchema from "../schema/projectSchema.js";
import parser from "../config/cloudinary.js";
import { createBug, updateBug } from "../controllers/bugController.js";
import bugSchema from "../schema/bugSchema.js";

const projectRouter = express.Router();
const validateProjectSchema = validateSchema(projectSchema);
const validateBugSchema = validateSchema(bugSchema);
const authorizeManager = roleAuthorization("Manager");
const authorizeQA = roleAuthorization("QA");
const authorizeDeveloper = roleAuthorization("Developer");

projectRouter.get("/all", authorization, getAllProjects);
projectRouter.post(
  "/new",
  authorization,
  authorizeManager,
  validateProjectSchema,
  createProject
);
projectRouter.get(
  "/developer/:id",
  authorization,
  authorizeDeveloper,
  getDeveloperProjects
);
projectRouter.get("/:id", authorization, getSingleProject);
projectRouter.patch(
  "/:id/update",
  authorization,
  authorizeManager,
  updateProject
);
projectRouter.patch(
  `/:id/addUser/:userId`,
  authorization,
  authorizeManager,
  addUserToProject
);
projectRouter.patch(
  `/:id/removeUser/:userId`,
  authorization,
  authorizeManager,
  removeUserFromProject
);
projectRouter.delete(
  "/:id/delete",
  authorization,
  authorizeManager,
  deleteProject
);
projectRouter.get("/:id/bugs", authorization, getProjectBugs);
projectRouter.post(
  "/:id/bug/new",
  authorization,
  authorizeQA,
  parser.single("screenshot"),
  validateBugSchema,
  createBug
);
projectRouter.patch("/bug/:bugId/update", authorization, updateBug);

export default projectRouter;
