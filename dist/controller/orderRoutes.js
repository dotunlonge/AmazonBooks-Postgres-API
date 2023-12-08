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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderService_1 = __importDefault(require("../service/orderService"));
const verifyToken_1 = __importDefault(require("./middleware/verifyToken"));
/**
 * Express router for handling order-related endpoints.
 */
const router = express_1.default.Router();
/**
 * Create a new order.
 * @name POST /orders
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Response} - Returns JSON data for the new order or error message.
 */
router.post('/orders', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = req.body; // Assuming the request body contains order data
    try {
        const newOrder = yield orderService_1.default.createOrder(orderData);
        res.status(201).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
/**
 * Cancel an order by ID.
 * @name DELETE /orders/:id
 * @param {Request} req - The request object containing the order ID in the params.
 * @param {Response} res - The response object.
 * @returns {Response} - Returns success message or error if order not found or already cancelled.
 */
router.delete('/orders/:id', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const isCancelled = yield orderService_1.default.cancelOrder(Number(id));
        if (isCancelled) {
            res.json({ message: 'Order cancelled successfully' });
        }
        else {
            res.status(404).json({ message: 'Order not found or already cancelled' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
/**
 * Retrieve order by ID.
 * @name GET /orders/:id
 * @param {Request} req - The request object containing the order ID in the params.
 * @param {Response} res - The response object.
 * @returns {Response} - Returns JSON data for the specific order or error message if not found.
 */
router.get('/orders/:id', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield orderService_1.default.getOrderById(Number(id));
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.default = router;
