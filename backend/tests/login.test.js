require("dotenv").config();
const app = require("../app");
const mockserver = require("supertest");
const User = require("../models/user.js");
const { startDb, stopDb, deleteAll } = require("./utils/inMemoryDb");
const jwt = require("jsonwebtoken");
const {
  setupGoogleSuccessResponse,
  setupGoogleErrorResponse,
} = require("./utils/httpMock");

describe("/api/user/login tests", () => {
  let connection;
  let server;
  let client;

  beforeAll(async () => {
    [server, connection] = await startDb();
    client = mockserver.agent(app);
  });

  afterEach(async () => {
    await deleteAll(User);
  });

  afterAll(async () => {
    await stopDb(server, connection);
  });

  test("1. testing client gets 400, when trying to post without body", async () => {
    // given

    // when
    const response = await client.post("/api/user/login").send({});

    // then
    expect(response.status).toBe(400);
  });

  test("2. testing client gets 400, when trying to post login without provider body", async () => {
    // given
    const code = "random";

    // when
    const response = await client.post("/api/user/login").send({
      code,
    });

    // then
    expect(response.status).toBe(400);
  });

  test("3. testing client gets 400, when trying to post login without code data", async () => {
    // given

    const provider = "github";

    // when
    const response = await client.post("/api/user/login").send({
      provider,
    });

    // then
    expect(response.status).toBe(400);
  });

  test("4. testing client with invalid provider gets 400, when trying to post login with user not created", async () => {
    // given
    const code = "random";
    const provider = "gogggls";

    // when
    const response = await client.post("/api/user/login").send({
      code,
      provider,
    });

    // then
    expect(response.status).toBe(400);
  });

  test("5. testing client with valid body data gets 200, when trying to post login with user not created", async () => {
    // given
    const code = "random";
    const provider = "google";
    const googleUserId = "1234567";
    setupGoogleSuccessResponse(googleUserId);

    // when
    const response = await client.post("/api/user/login").send({
      code,
      provider,
    });

    // then
    expect(response.status).toBe(200);
    const responseToken = jwt.decode(response.body.token);
    expect(responseToken.providers.google).toBe(googleUserId);
    const users = await User.find();
    expect(users).toStrictEqual([]);
  });

  test("6. testing client with invalid code gets 401", async () => {
    // given
    const code = "random";
    const provider = "google";
    setupGoogleErrorResponse();

    // when
    const response = await client.post("/api/user/login").send({
      code,
      provider,
    });

    // then
    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({});
    const users = await User.find();
    expect(users).toStrictEqual([]);
  });
});
