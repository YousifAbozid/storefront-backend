"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../utils/auth"));
var orders_1 = __importDefault(require("../handlers/orders"));
var ordersRouter = express_1.default.Router();
var handler = new orders_1.default();
// Get all orders
ordersRouter.get('/', auth_1.default, handler.getOrders);
// Get order by id
ordersRouter.get('/:id', auth_1.default, handler.getOrderById);
// Get orders by user id
ordersRouter.get('/user-orders/:id', auth_1.default, handler.getCurrentOrders);
// Create new order
ordersRouter.post('/create', auth_1.default, handler.createOrder);
// Add product to order
ordersRouter.post('/add-product/:id', auth_1.default, handler.addProductToOrder);
// Update order
ordersRouter.put('/:id', auth_1.default, handler.updateOrder);
// Delete order
ordersRouter.delete('/:id', auth_1.default, handler.deleteOrder);
exports.default = ordersRouter;
