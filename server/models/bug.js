import mongoose from "mongoose";
import { types } from "../constants.js";

const bugSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, { tile: "Title Require" }],
    unique: true,
  },
  description: {
    type: String,
  },
  deadline: {
    type: Date,
    required: [true, { deadline: "deadline Require" }],
  },
  type: {
    type: String,
    required: [true, { type: "Type Require" }],
    enum: {
      values: types,
      message: { Type: "Type should be feature or bug" },
    },
  },
  status: {
    type: String,
    required: [true, { status: "status Require" }],
  },
  screenshot: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "projects",
  },
  developer: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
});

bugSchema.post('save' , function (error, doc, next) {
    if (error.code === 11000) {
      next({title: "Bug with this Title already exist" });
    } else {
      next(error);
    }
})

const bug = mongoose.model("bugs", bugSchema, "bugs");

export default bug;
