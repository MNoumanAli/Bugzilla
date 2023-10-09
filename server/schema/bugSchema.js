import * as Yup from "yup";

const bugSchema = Yup.object().shape({
  title: Yup.string().required({ title: "Title is require" }),
  description: Yup.string(),
  deadline: Yup.date().required({ deadline: "Deadline is require" }),
  type: Yup.string()
    .oneOf(["feature", "bug"], { type: "Type should be feature or bug." })
    .required({ type: "Type is require." }),
  status: Yup.string().required({ status: "Status is require" }),
});

export default bugSchema; // abort early
