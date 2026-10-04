import express from "express";
import messagesRouter from "./routes/api/v1/messages.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/v1/messages", messagesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
