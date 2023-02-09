"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_1 = __importDefault(require("./products"));
var users_1 = __importDefault(require("./users"));
var apiRouter = express_1.default.Router();
apiRouter.use('/products', products_1.default);
apiRouter.use('/users', users_1.default);
exports.default = apiRouter;
