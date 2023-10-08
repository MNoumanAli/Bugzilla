import mongoose, { Schema } from "mongoose";
import { roles} from "../constants.js";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, {name : 'Name is Required'}],
    min: [5, { name: "Minimum 5 character Required" }],
  },
  email: {
    type: String,
    required: [true , {email : 'Email is required'}],
    unique: true,
  },
  password: {
    type: String,
    require: [true, {password : 'Password is required'}],
    min: [6, { password: "Password must be 6 character long" }],
  },
  role: {
    type: String,
    require: [true, {role : 'Role is required'}],
    enum: {
      values: roles,      
      message: { role: "Role should be Manager, QA or Developer." },
    },
  },
  projects : [
    {
      type : mongoose.Schema.ObjectId,
      ref : 'projects'
    }
  ]
});

userSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    next({ email: "Email Already Exist" });
  } else {
    next(error);
  }
});

const user = mongoose.model("users", userSchema, "users");

export default user;
