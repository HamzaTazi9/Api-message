import express from "express";
import messagesRouter from "./routes/api/v1/messages.js";
import mongoose from "mongoose";


const app = express();
const PORT = process.env.PORT || 3001;

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nodejs-messages";

// Mongoose doesn't retry a failed first connection, so keep trying every 5 seconds
const connectToDatabase = () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => {
      console.error("MongoDB connection error:", error.message);
      setTimeout(connectToDatabase, 5000);
    });
};

connectToDatabase();

app.use(express.json());

app.use("/api/v1/messages", messagesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
