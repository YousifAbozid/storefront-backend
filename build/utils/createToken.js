"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWTToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var tokenSecret = process.env.TOKEN_SECRET;
var createJWTToken = function (id, first_name, last_name) {
    return jsonwebtoken_1.default.sign({ id: id, first_name: first_name, last_name: last_name }, tokenSecret);
};
exports.createJWTToken = createJWTToken;
