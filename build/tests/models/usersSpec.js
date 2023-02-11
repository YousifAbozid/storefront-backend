"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../index"));
var createToken_1 = require("../../utils/createToken");
var request = (0, supertest_1.default)(index_1.default);
var token = (0, createToken_1.createJWTToken)(1, 'test', 'user');
describe('Users handlers: ', function () {
    it('/users should return a user', function () {
        var data = {
            first_name: 'yousif',
            last_name: 'abozid',
            password: 'password',
        };
        request
            .post('/api/users')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            id: 1,
            first_name: 'yousif',
            last_name: 'abozid',
        });
    });
    it('/users should fail if required fields is not sent', function () {
        var data = {
            first_name: 'yousif',
            password: 'password',
        };
        request
            .post('/api/users')
            .set('Authorization', "Bearer ".concat(token))
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
            error: 'Missing name or password',
        });
    });
    it('/users should fail if required password is not sent', function () {
        var data = {
            first_name: 'yousif',
            last_name: 'abozid',
        };
        request
            .post('/api/users')
            .set('Authorization', "Bearer ".concat(token))
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
            error: 'Missing name or password',
        });
    });
    it('/users should return all users', function () {
        request
            .get('/api/users')
            .set('Authorization', "Bearer ".concat(token))
            .expect(200)
            .expect('Content-Type', 'application/json')
            .expect([
            {
                id: 1,
                first_name: 'yousif',
                last_name: 'abozid',
            },
        ]);
    });
    it('/users/:id should show a user', function () {
        request
            .get('/api/users/1')
            .set('Authorization', "Bearer ".concat(token))
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            id: 1,
            first_name: 'yousif',
            last_name: 'abozid',
        });
    });
    it('/users/:id should update a user', function () {
        var data = {
            first_name: 'yousif',
            last_name: 'mohamed',
        };
        request
            .put('/api/users/1')
            .set('Authorization', "Bearer ".concat(token))
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
            id: 1,
            first_name: 'yousif',
            last_name: 'abozid',
        });
    });
    it('/users/:id should delete a user', function () {
        request.delete('/api/users/1').expect(200).expect({
            message: 'Deleted user 1',
        });
    });
});
