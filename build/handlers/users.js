"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_1 = require("../models/user");
var bcrypt_1 = __importDefault(require("bcrypt"));
var store = new user_1.UserStore();
var pepper = process.env.PEPPER;
var saltRounds = parseInt(process.env.SALT_ROUNDS);
var tokenSecret = process.env.TOKEN_SECRET;
// This is the handler for the users route
var UsersHandler = /** @class */ (function () {
    function UsersHandler() {
    }
    // Get all users
    UsersHandler.prototype.getUsers = function (_req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, store.index()];
                    case 1:
                        users = _a.sent();
                        res.json(users);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(404).json({ error: 'Could not get users' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get a user by id
    UsersHandler.prototype.getUserById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, store.show(parseInt(req.params.id))];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            res.json(user);
                        }
                        else {
                            res.status(404).json({ error: 'User not found' });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(404).json({ error: 'Could not get user' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Create a new user
    UsersHandler.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // Check for required fields
                        if (!req.body.first_name || !req.body.last_name || !req.body.password) {
                            return [2 /*return*/, res.status(400).json({
                                    error: 'Missing name or password',
                                })];
                        }
                        hashedPassword = bcrypt_1.default.hashSync(req.body.password + pepper, saltRounds);
                        return [4 /*yield*/, store.create({
                                first_name: req.body.first_name,
                                last_name: req.body.last_name,
                                password: hashedPassword,
                            })];
                    case 1:
                        user = _a.sent();
                        delete user.password;
                        // @ts-ignore
                        user.token = jsonwebtoken_1.default.sign({ id: user.id, first_name: user.first_name, last_name: user.last_name }, tokenSecret);
                        res.status(201).json(user);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: 'Could not create user' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Update a user
    UsersHandler.prototype.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // Check for required fields
                        if (!req.body.first_name || !req.body.last_name || !req.body.password) {
                            return [2 /*return*/, res.status(400).json({
                                    error: 'Missing required parameters',
                                })];
                        }
                        return [4 /*yield*/, store.update({
                                id: parseInt(req.params.id),
                                first_name: req.body.first_name,
                                last_name: req.body.last_name,
                                password: req.body.password,
                            })];
                    case 1:
                        user = _a.sent();
                        delete user.password;
                        res.status(201).json(user);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        res.status(500).json(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Delete a user
    UsersHandler.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, store.delete(parseInt(req.params.id))];
                    case 1:
                        _a.sent();
                        res.json({ message: "Deleted user ".concat(req.params.id) });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        res.status(500).json({ error: 'Could not delete user' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UsersHandler;
}());
exports.default = UsersHandler;
