import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URI || "")
    .then(() => console.log("Database is connected"))
    .catch((err) => console.error(err));
};
