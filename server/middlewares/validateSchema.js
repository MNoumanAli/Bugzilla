const validateSchema = (schema) => {
  return async function (req, res, next) {
    try {
      await schema.validate(req.body);
      next();
    } catch (err) {
      res.status(400).send(err.message);
    }
  };
};
export default validateSchema;
