"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const bookRoutes_1 = __importDefault(require("./controller/bookRoutes"));
const orderRoutes_1 = __importDefault(require("./controller/orderRoutes"));
const userRoutes_1 = __importDefault(require("./controller/userRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(body_parser_1.default.json());
// Routes
app.use('/api', bookRoutes_1.default); // Mount book routes at /api/books
app.use('/api', orderRoutes_1.default); // Mount book routes at /api/order
app.use('/api', userRoutes_1.default); // Mount book routes at /api/user
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
