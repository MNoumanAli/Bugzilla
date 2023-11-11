import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/index.js";
import { connection } from "./config/db.js";

export const app = express();
dotenv.config()
// routes
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// define routes
app.use("/", router.userRouter);
app.use("/project", router.projectRouter);
// create connection
connection();
