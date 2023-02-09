"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); // Import express
var body_parser_1 = __importDefault(require("body-parser")); // Import body-parser
var cors_1 = __importDefault(require("cors")); // Import cors
var dotenv_1 = __importDefault(require("dotenv")); // Import dotenv
var routes_1 = __importDefault(require("./routes")); // Import routes
var app = (0, express_1.default)(); // Create a new express app instance
dotenv_1.default.config(); // Load environment variables from .env file
var port = process.env.PORT || 3000; // The port the express app will listen on
app.use(body_parser_1.default.json()); // Parse JSON bodies
app.use(body_parser_1.default.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use((0, cors_1.default)()); // Enable All CORS Requests
// Use the apiRouter
app.use('/api', routes_1.default);
// root endpoint
app.use('/', function (req, res) {
    res.send('Server Is Running!');
});
// The express app will listen on the port
app.listen(port, function () {
    return console.log("Server running on port ".concat(port, " \nClick on the link to visit it ==> (http://localhost:").concat(port, ")"));
});
exports.default = app;
