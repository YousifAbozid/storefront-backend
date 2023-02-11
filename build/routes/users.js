"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("../handlers/users"));
var auth_1 = __importDefault(require("../utils/auth"));
var usersRouter = express_1.default.Router();
var usersHandler = new users_1.default();
// Get all users
usersRouter.get('/', usersHandler.getUsers);
// Get a user by id
usersRouter.get('/:id', usersHandler.getUserById);
// Create a user
usersRouter.post('/', usersHandler.createUser);
// Update a user
usersRouter.put('/:id', auth_1.default, usersHandler.updateUser);
// Delete a user
usersRouter.delete('/:id', auth_1.default, usersHandler.deleteUser);
exports.default = usersRouter;
