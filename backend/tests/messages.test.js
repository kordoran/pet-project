require("dotenv").config();
const app = require("../app");
const mockserver = require("supertest");
const Message = require("../models/message.js");
const { startDb, stopDb, deleteAll } = require("./utils/inMemoryDb");
const jwt = require("jsonwebtoken");

describe("/api/messages tests", () => {
  let connection;
  let server;
  let client;

  beforeAll(async () => {
    [server, connection] = await startDb();
    client = mockserver.agent(app);
  });

  afterEach(async () => {
    await deleteAll(Message);
  });

  afterAll(async () => {
    await stopDb(server, connection);
  });

  test("1. testing client gets 401, when trying to send new message without token", async () => {
    // given
    const sender = 12345678;
    const text = "Message";
    const conversationId = 11223344;
    const newMessage = new Message({ sender, text, conversationId });
    const savedMessage = newMessage.save();
    client.set(savedMessage);

    // when
    const response = await client.post("/api/messages/");

    // then
    expect(response.status).toBe(401);
  });

  test("2. testing client gets 401, when trying to get messages without token", async () => {
    // given
    const messages = await Message.find({
      conversationId: 12345678,
    });
    client.set(messages);

    // when
    const response = await client.get("/api/messages/:conversationId");

    // then
    expect(response.status).toBe(401);
  });

  test("3. testing client gets 200, when trying to send new message with token", async () => {
    // given
    const sender = 12345678;
    const text = "Message";
    const conversationId = 11223344;
    const newMessage = new Message({ sender, text, conversationId });
    const savedMessage = newMessage.save();
    const token = jwt.sign({ userId: 12345678 }, process.env.JWT_SECRET);
    client.set("authorization", token, savedMessage);

    // when
    const response = await client.post("/api/messages/");

    // then
    expect(response.status).toBe(200);
  });

  test("4. testing client gets 200, when trying to get messages with token", async () => {
    // given
    const messages = await Message.find({
      conversationId: 12345678,
    });
    const token = jwt.sign({ userId: 12345678 }, process.env.JWT_SECRET);
    client.set("authorization", token, messages);

    // when
    const response = await client.get("/api/messages/:conversationId");

    // then
    expect(response.status).toBe(200);
  });
});
