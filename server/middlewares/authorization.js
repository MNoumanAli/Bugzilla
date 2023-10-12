import jwt from "jsonwebtoken";

export const authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const verifiedData = jwt.verify(token, process.env.ACCESS_TOKEN);
      req.userId = verifiedData.id;
      req.role = verifiedData.role;
      next();
    } else {
      res.status(401).send({ Message: "Not allowed" });
    }
  } catch (error) {
    res
      .status(400)
      .send({
        Message: "Error Responding to your request.",
        error: error.message,
      });
  }
};

export const roleAuthorization = (role) => {
  return async function (req, res, next) {
    try {
      if (role === req.role) {
        next();
      } else {
        res.status(401).send({ Message: "Unauthorized" });
      }
    } catch (error) {
      res
        .status(400)
        .send({
          Message: "Error Responding to your request.",
          error: error.message,
        });
    }
  };
};
