require('dotenv').config();
const app = require('../app')
const mockserver = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user.js')
const { MongoMemoryServer } = require('mongodb-memory-server');
const { startDb, stopDb, deleteAll } = require('./util/inMemoryDb')
const jwt = require("jsonwebtoken");

describe('/api/dashboard get tests', () => {

    let connection;
    let server;
    let client;

    beforeAll(async() => {
        [server, connection] = await startDb();
        client = mockserver.agent(app);
    });

    afterEach(async() => {
        await deleteAll(User);
    });

    afterAll(async() => {
        await stopDb(server, connection);
    });

    test('new user gets empty list', async() => {
        // given
        const newUser = new User({ username: 'macska', googleId: '1234567' });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
        client.set('authorization', token);

        // when
        const response = await client.get('/api/dashboards');

        // then
        expect(response.status).toBe(200);
        const responseData = response.body;
        expect(responseData.user.dashboards).toStrictEqual([]);
    })

    test('deleted user receives null', async() => {
        // given
        const newUser = new User({ username: 'macska', googleId: '1234567' });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
        client.set('authorization', token);
        await User.deleteMany();

        // when
        const response = await client.get('/api/dashboards');

        // then
        const responseData = response.body;
        expect(response.status).toBe(200);
        expect(responseData.user).toBeNull();
    })

});