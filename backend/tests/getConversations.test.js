require("dotenv").config();
const app = require("../app");
const mockserver = require("supertest");
const mongoose = require("mongoose");
const Conversation = require("../models/conversation.js");
const Item = require("../models/item.js");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { startDb, stopDb, deleteAll } = require("./utils/inMemoryDb");
const jwt = require("jsonwebtoken");

describe("/api/conversations get tests", () => {
  let connection;
  let server;
  let client;

  beforeAll(async () => {
    [server, connection] = await startDb();
    client = mockserver.agent(app);
  });

  afterEach(async () => {
    await deleteAll(Item);
  });

  afterAll(async () => {
    await stopDb(server, connection);
  });

  test("1. testing client gets 401, when trying to post new conversation without token", async () => {
    // given
    const senderId = 123456;
    const receiverId = 112233;
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });
    const savedConversation = newConversation.save();
    client.set(savedConversation);

    // when
    const response = await client.post("/api/conversations");

    // then
    expect(response.status).toBe(401);
  });

  test("2. testing client gets 200, when trying to post new conversation with token", async () => {
    // given
    const senderId = 123456;
    const receiverId = 112233;
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });
    const savedConversation = newConversation.save();
    const token = jwt.sign({ userId: 12345678 }, process.env.JWT_SECRET);
    client.set("authorization", token, savedConversation);

    // when
    const response = await client.post("/api/conversations");

    // then
    expect(response.status).toBe(200);
  });
});
