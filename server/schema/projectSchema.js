import * as Yup from "yup";

const projectSchema = Yup.object().shape({
  title: Yup.string().required({ title: "Title is require" }),
  description: Yup.string().required({ description: "Description is require" }),
});
export default projectSchema;
