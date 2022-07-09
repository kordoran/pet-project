require("dotenv").config();
const app = require("../app");
const mockserver = require("supertest");
const mongoose = require("mongoose");
const User = require("../models/user.js");
const Item = require("../models/item.js");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { startDb, stopDb, deleteAll } = require("./utils/inMemoryDb");
const jwt = require("jsonwebtoken");

describe("/api/items get tests", () => {
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

  test("1. testing client gets all items without token from /items", async () => {
    // given
    const filter = {};
    const allItems = await Item.find(filter);
    client.set(allItems);

    // when
    const response = await client.get("/api/items");

    // then
    expect(response.status).toBe(200);
  });

  test("2. testing client without token receives 401, when trying to get own items", async () => {
    // given
    const myItems = await Item.find({
      user_id: 12345678,
    });
    client.set(myItems);

    // when
    const response = await client.get("/api/items/:user_id");

    // then
    expect(response.status).toBe(401);
  });

  test("3. testing client without token receives 401, when trying to post new item", async () => {
    // given
    const newItem = new Item({
      user_id: User._id,
      itemType: "Vinyl LP",
      artist: "String",
      albumTitle: "String",
      releaseYear: 1234,
      recordLabel: "String",
      placeOfRelease: "String",
      price: 1234,
      coverURL: "URL",
      UPC: 12345678,
      dateOfUpdate: "2022-07-04",
      shippingAvailable: false,
      personalExchangeAvailable: false,
    });
    client.set(newItem);

    // when
    const response = await client.post("/api/items/");

    // then
    expect(response.status).toBe(401);
  });

  test("4. testing client with token can post new Item to /items, gets back 200", async () => {
    // given
    const newItem = new Item({
      user_id: User._id,
      itemType: "Vinyl LP",
      artist: "String",
      albumTitle: "String",
      releaseYear: 1234,
      recordLabel: "String",
      placeOfRelease: "String",
      price: 1234,
      coverURL: "URL",
      UPC: 12345678,
      dateOfUpdate: "2022-07-04",
      shippingAvailable: false,
      personalExchangeAvailable: false,
    });
    const token = jwt.sign({ userId: 12345678 }, process.env.JWT_SECRET);
    client.set("authorization", token, newItem);

    // when
    const response = await client.post("/api/items/");

    // then
    expect(response.status).toBe(200);
  });

  /*  test("3. testing user without token deletes item receives 401", async () => {
    // given
    const _id = Item._id;
    await Item.findByIdAndRemove(_id);
    client.set("");

    // when
    const response = await client.delete("/api/items/delete/:id");

    // then
    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({});
  }); */

  test("5. testing user with token receives 200, gets own items", async () => {
    // given
    const myItems = await Item.find({
      user_id: 12345678,
    });
    const token = jwt.sign({ userId: 12345678 }, process.env.JWT_SECRET);
    client.set("authorization", token, myItems);

    // when
    const response = await client.get("/api/items/:user_id");

    // then
    expect(response.status).toBe(200);
  });

  /* test("new user gets empty list", async () => {
    // given
    const newUser = new User({ username: "bob", googleId: "1234567" });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    client.set("authorization", token);

    // when
    const response = await client.get("/api/items");

    // then
    expect(response.status).toBe(200);
    const responseData = response.body;
    expect(responseData.user.dashboards).toStrictEqual([]);
  }); */

  /*   test("deleted user receives null", async () => {
    // given
    const newUser = new User({ username: "bob", googleId: "1234567" });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    client.set("authorization", token);
    await User.deleteMany();

    // when
    const response = await client.get("/api/items");

    // then
    const responseData = response.body;
    expect(response.status).toBe(200);
    expect(responseData.user).toBeNull();
  }); */
});
