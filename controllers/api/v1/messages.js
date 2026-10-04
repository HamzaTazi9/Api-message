let messages = [
  {
    id: 1,
    user: "Hamza",
    message: "Hey, welkom in de chat!",
  },
  {
    id: 2,
    user: "Ibrahim",
    message: "Hallo iedereen!",
  },
  {
    id: 3,
    user: "Hamza",
    message: "Hoe gaat het?",
  },
];

export function list(req, res) {
  res.json({
    status: "success",
    data: { messages },
  });
}

export function get(req, res) {
  const id = Number(req.params.id);
  const message = messages.find((item) => item.id === id);

  if (!message) {
    return res.status(404).json({
      status: "fail",
      data: { message: "Message not found" },
    });
  }

  res.json({
    status: "success",
    data: { message },
  });
}

export function create(req, res) {
  const { user, message } = req.body;

  if (!user || !message) {
    return res.status(400).json({
      status: "fail",
      data: { message: "User and message are required" },
    });
  }

  const newMessage = {
    id: messages.length ? Math.max(...messages.map((item) => item.id)) + 1 : 1,
    user,
    message,
  };

  messages.push(newMessage);

  res.status(201).json({
    status: "success",
    data: { message: newMessage },
  });
}

export function update(req, res) {
  const id = Number(req.params.id);
  const { user, message } = req.body;

  const existingMessage = messages.find((item) => item.id === id);

  if (!existingMessage) {
    return res.status(404).json({
      status: "fail",
      data: { message: "Message not found" },
    });
  }

  if (user) existingMessage.user = user;
  if (message) existingMessage.message = message;

  res.json({
    status: "success",
    data: { message: existingMessage },
  });
}

export function remove(req, res) {
  const id = Number(req.params.id);
  const index = messages.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      data: { message: "Message not found" },
    });
  }

  const deletedMessage = messages.splice(index, 1)[0];

  res.json({
    status: "success",
    data: { message: deletedMessage },
  });
}
