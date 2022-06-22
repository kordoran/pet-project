require('dotenv').config();
const app = require('../app')
const mockserver = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user.js')
const { MongoMemoryServer } = require('mongodb-memory-server');
const { startDb, stopDb, deleteAll } = require('./utils/inMemoryDb')
const jwt = require("jsonwebtoken");
const { setupGoogleSuccessResponse,  setupGoogleErrorResponse } = require('./utils/httpMock')

describe('/api/user/login tests', () => {
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

    test('1. should return 400 without body', async() => {
        // given


        // when
        const response = await client.post('/api/user/login').send({});

        // then
        expect(response.status).toBe(400);

    });

    test('2. should return 400 without provider body', async() => {
        // given
        const code = "random";
        

        // when
        const response = await client.post('/api/user/login').send({
            code
        });

        // then
        expect(response.status).toBe(400);

    });

    test('3. should return 400 without code data', async() => {
        // given
        
        const provider = "github";

        // when
        const response = await client.post('/api/user/login').send({
            provider
        });

        // then
        expect(response.status).toBe(400);

    });

    test('4. should return 400 with invalid provider, user not created', async() => {
        // given
        const code = "random";
        const provider = "face";

        // when
        const response = await client.post('/api/user/login').send({
            code, 
            provider
        });

        // then
        expect(response.status).toBe(400);

    });

    test('5. should return jwt and 200 with valid body data, user not created', async() => {
        // given
        const code = "random";
        const provider = "google";
        const googleUserId = '1234567'
        setupGoogleSuccessResponse(googleUserId);
        
        // when
        const response = await client.post('/api/user/login').send({
            code, 
            provider
        });

        // then
        expect(response.status).toBe(200);
        const responseToken = jwt.decode(response.body.token);
        expect(responseToken.providers.google).toBe(googleUserId);
        const users = await User.find();
        expect(users).toStrictEqual([]);

    });

    
    test('6. should return 401 with invalid code', async() => {
        // given
        const code = "random";
        const provider = "google";
        setupGoogleErrorResponse();
        
        // when
        const response = await client.post('/api/user/login').send({
            code, 
            provider
        });

        // then
        expect(response.status).toBe(401);
        expect(response.body).toStrictEqual({});
        const users = await User.find();
        expect(users).toStrictEqual([]);

    });

});