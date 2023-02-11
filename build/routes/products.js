"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_1 = __importDefault(require("../handlers/products"));
var auth_1 = __importDefault(require("../utils/auth"));
var productsRouter = express_1.default.Router();
var handler = new products_1.default();
// Get all products
productsRouter.get('/', handler.getProducts);
// Get a product by id
productsRouter.get('/:id', handler.getProductsById);
// Create a product
productsRouter.post('/', handler.createProduct);
// Update a product
productsRouter.put('/:id', handler.updateProduct);
// Delete a product
productsRouter.delete('/:id', auth_1.default, handler.deleteProduct);
exports.default = productsRouter;
