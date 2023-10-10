import mongoose from "mongoose";
import { app } from "../index.js";

export const connection = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const server = app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
    server.on("error", (error) => {
      console.error("Server error:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
