import mongoose, {Schema} from "mongoose";

const projectSchema = new Schema({
  title: {
    type: String,
    required: [true, {tile : 'Title Require'}],
  },
  description: {
    type: String,
    required: [true, {description : 'Description Require'}],
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  bugs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "bugs",
    },
  ],
  developer: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
  ],
  QA: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
  ],
});

const project = mongoose.model("projects", projectSchema, "projects");
export default project;
