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
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../models/order");
var store = new order_1.OrderStore();
// This is the handler class
var OrdersHandler = /** @class */ (function () {
    function OrdersHandler() {
    }
    // Get all orders
    OrdersHandler.prototype.getOrders = function (_req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var orders, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, store.index()];
                    case 1:
                        orders = _a.sent();
                        res.json(orders);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        res.status(500).json(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get order by id
    OrdersHandler.prototype.getOrderById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var order, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, store.show(parseInt(req.params.id))];
                    case 1:
                        order = _a.sent();
                        res.json(order);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        res.status(400).json(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Create new order
    OrdersHandler.prototype.createOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user_id, status_1, order, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, user_id = _a.user_id, status_1 = _a.status;
                        if (!user_id || !status_1) {
                            return [2 /*return*/, res.status(400).json({
                                    error: 'Missing one or more required parameters',
                                })];
                        }
                        return [4 /*yield*/, store.create({
                                user_id: parseInt(user_id),
                                status: status_1,
                            })];
                    case 1:
                        order = _b.sent();
                        res.status(201).json(order);
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _b.sent();
                        res.status(400).json(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Update order
    OrdersHandler.prototype.updateOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user_id, status_2, id, order, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, user_id = _a.user_id, status_2 = _a.status;
                        id = req.params.id;
                        if (!id || !user_id || !status_2) {
                            return [2 /*return*/, res.status(400).json({
                                    error: 'Missing one or more required parameters',
                                })];
                        }
                        return [4 /*yield*/, store.update({
                                id: parseInt(req.params.id),
                                user_id: parseInt(user_id),
                                status: status_2,
                            })];
                    case 1:
                        order = _b.sent();
                        res.status(201).json(order);
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _b.sent();
                        res.status(500).json(e_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Delete order
    OrdersHandler.prototype.deleteOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, store.delete(parseInt(req.params.id))];
                    case 1:
                        _a.sent();
                        res.json({ status: "Deleted order ".concat(req.params.id) });
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        res.status(500).json(e_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Add product to order
    OrdersHandler.prototype.addProductToOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var order_id, product_id, quantity, product, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        order_id = parseInt(req.params.id);
                        product_id = parseInt(req.body.product_id);
                        quantity = parseInt(req.body.quantity);
                        if (!order_id || !product_id || !quantity) {
                            return [2 /*return*/, res.status(400).json({
                                    error: 'Missing one or more required parameters',
                                })];
                        }
                        return [4 /*yield*/, store.addProductToOrder({
                                order_id: order_id,
                                product_id: product_id,
                                quantity: quantity,
                            })];
                    case 1:
                        product = _a.sent();
                        res.json(product);
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        res.status(400).json(e_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get all products in order
    OrdersHandler.prototype.getCurrentOrders = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var currentOrders, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, store.getCurrentOrders(parseInt(req.params.id))];
                    case 1:
                        currentOrders = _a.sent();
                        res.json(currentOrders);
                        return [3 /*break*/, 3];
                    case 2:
                        e_7 = _a.sent();
                        res.status(400).json(e_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return OrdersHandler;
}());
exports.default = OrdersHandler;
