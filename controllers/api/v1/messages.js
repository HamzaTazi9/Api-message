//import message model
import Message from "../../../models/api/v1/Message.js";

// Invalid ids and missing fields are client errors (400), everything else is a server error (500)
const handleError = (res, error) => {
  if (error.name === "CastError" || error.name === "ValidationError") {
    return res.status(400).json({ status: "fail", message: error.message });
  }

  res.status(500).json({ status: "error", message: error.message });
};

// Accept both { text, user } and { message: { text, user } }
const getBody = (req) => {
  const body = req.body || {};
  return typeof body.message === "object" && body.message !== null
    ? body.message
    : body;
};

export const list = async (req, res) => {
  try {
    // Make a variable messages, load all messages from the database using the Message model
    const messages = await Message.find({});

    res.json({
      status: "success",
      data: { messages },
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const get = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ status: "fail", message: "Message not found" });
    }

    res.json({
      status: "success",
      data: { message },
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const create = async (req, res) => {
  try {
    const { text, user } = getBody(req);
    const message = new Message({ text, user });

    await message.save();

    const result = {
      status: "success",
      data: { message },
    };

    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const update = async (req, res) => {
  try {
    // Only update the fields that were sent
    const { text, user } = getBody(req);
    const changes = {};
    if (text !== undefined) changes.text = text;
    if (user !== undefined) changes.user = user;

    const message = await Message.findByIdAndUpdate(req.params.id, changes, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!message) {
      return res.status(404).json({ status: "fail", message: "Message not found" });
    }

    res.json({
      status: "success",
      data: { message },
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const remove = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ status: "fail", message: "Message not found" });
    }

    res.json({
      status: "success",
      data: { message },
    });
  } catch (error) {
    handleError(res, error);
  }
};
