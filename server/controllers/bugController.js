import {
  createBugService,
  deleteBugService,
  getAllBugsService,
  getSingleBugService,
  updateBugService,
} from "../services/bugServices.js";
export const getAllBugs = async (id) => {
  try {
    const data = await getAllBugsService(id);
    return data;
  } catch (error) {
    return null;
  }
};

export const getSingleBug = async (req, res) => {
  try {
    const data = await getSingleBugService(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    res
      .status(400)
      .send({ Message: "Error Getting Bug.", error: error.Message });
  }
};

export const createBug = async (req, res) => {
  try {
    const saveBug = await createBugService({
      ...req.body,
      screenshot: req.file && req.file.path,
      owner: req.userId,
      project: req.params.id,
    });
    res.status(200).send(saveBug);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteBug = async (req, res) => {
  try {
    await deleteBugService(req.params.id);
    res.status(200).send({ Message: "Delete Successful" });
  } catch (error) {
    res
      .status(200)
      .send({ Message: "Uncessful Deletion", error: error.Message });
  }
};

export const updateBug = async (req, res) => {
  try {
    await updateBugService({ ...req.body }, req.params.bugId);
    res.status(200).send({ Message: "Update Successful" });
  } catch (error) {
    res
      .status(400)
      .send({ Message: "Unsuccessful updation", error: error.Message });
  }
};
