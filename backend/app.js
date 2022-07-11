const express = require("express");
require("express-async-errors");
const cors = require("cors");
const auth = require("./middlewares/auth");
const itemRoutes = require("./routes/item.js");
const messageRoutes = require("./routes/messages.js");
const conversationRoutes = require("./routes/conversation.js");
const userRoutes = require("./routes/user.js");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./doc.yaml");

const app = express();
const config = process.env;

app.use(express.json());
app.use(
  cors({
    origin: config.APP_URL,
  })
);

app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(
  morgan(
    ":method :url :status :res[content-length] :req[header] - :response-time ms"
  )
);

app.use("/api/items", itemRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationRoutes);

app.disable("etag");

module.exports = app;
