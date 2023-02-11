"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../index"));
var createToken_1 = require("../../utils/createToken");
var request = (0, supertest_1.default)(index_1.default);
var token = (0, createToken_1.createJWTToken)(1, 'Test', 'User');
describe('Product handlers: ', function () {
    it('should return a new user after it is created', function () {
        var data = {
            name: 'Test',
            price: 20.0,
        };
        request
            .post('/api/products')
            .set('Authorization', "Bearer ".concat(token))
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect({
            id: 1,
            name: 'Test',
            price: '$20.00',
        });
    });
    it('create product should fail if name is not included in parameters', function () {
        var data = {
            name: 'Test',
            price: 20.0,
        };
        request
            .post('/api/products')
            .set('Authorization', "Bearer ".concat(token))
            .send(data)
            .expect(400)
            .expect({
            error: 'Error: Product name is required',
        });
    });
    it('should show all products', function () {
        request
            .get('/api/products')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
            id: 1,
            name: 'Test',
            price: 20.0,
        });
    });
    it('should show a product given an id', function () {
        request
            .get('/api/products/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
            id: 1,
            name: 'Test',
            price: 20.0,
        });
    });
    it('should have an update product endpoint', function () {
        var data = {
            name: 'Test edited',
            price: 30.0,
        };
        request
            .put('/api/products/1')
            .set('Authorization', "Bearer ".concat(token))
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
            id: 1,
            name: 'Test edited',
            price: 30.0,
        });
    });
    it('should delete a product given its id', function () {
        request
            .delete('/api/products/1')
            .set('Authorization', "Bearer ".concat(token))
            .expect(200)
            .then(function () {
            request.get('/api/products').expect({});
        });
    });
});
