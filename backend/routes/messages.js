const router = require("express").Router();
const auth = require("../middlewares/auth");
const Message = require("../models/message");

// add message

router.post("/", auth({ block: true }), async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get message

router.get("/:conversationId", auth({ block: true }), async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
