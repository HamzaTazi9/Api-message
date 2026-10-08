import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: String, required: true },
}, {
  // Also expose "id" next to "_id" in JSON responses
  toJSON: { virtuals: true },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
