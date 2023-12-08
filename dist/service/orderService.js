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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderRepository_1 = __importDefault(require("../repository/orderRepository"));
const Order_1 = require("../entity/Order");
const bookRepository_1 = __importDefault(require("../repository/bookRepository"));
/**
 * Service handling order-related operations.
 */
class OrderService {
    /**
     * Creates a new order.
     * @param {Partial<Order>} orderData - Data for creating the order.
     * @returns {Promise<Order>} - Returns the newly created order.
     */
    static createOrder(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { books } = orderData, orderAttributes = __rest(orderData, ["books"]);
                if (!books || books.length === 0) {
                    throw new Error('At least one book must be provided for the order');
                }
                const invalidBookIds = [];
                for (const bookData of books) {
                    const { bookId, quantity } = bookData;
                    const bookExists = yield bookRepository_1.default.findById(bookId);
                    if (!bookExists) {
                        invalidBookIds.push(bookId);
                    }
                }
                if (invalidBookIds.length > 0) {
                    throw new Error(`Books not found: ${invalidBookIds.join(', ')}`);
                }
                const newOrder = yield Order_1.Order.create(orderAttributes);
                // Create order items for each book with quantities
                for (const bookData of books) {
                    const { bookId, quantity } = bookData;
                    yield Order_1.OrderItem.create({
                        orderId: newOrder.id,
                        bookId,
                        quantity,
                    });
                }
                return newOrder;
            }
            catch (error) {
                throw new Error(`Error creating order: ${error.message}`);
            }
        });
    }
    /**
     * Cancels an order by ID.
     * @param {number} orderId - ID of the order to cancel.
     * @returns {Promise<boolean>} - Returns true if the order was successfully cancelled.
     */
    static cancelOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isCancelled = yield orderRepository_1.default.cancel(orderId);
                return isCancelled;
            }
            catch (error) {
                throw new Error(`Error cancelling order: ${error.message}`);
            }
        });
    }
    /**
     * Retrieves an order by its ID.
     * @param {number} orderId - ID of the order to retrieve.
     * @returns {Promise<Order | null>} - Returns the order if found, otherwise null.
     */
    static getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield orderRepository_1.default.findById(orderId);
                return order;
            }
            catch (error) {
                throw new Error(`Error fetching order: ${error.message}`);
            }
        });
    }
}
exports.default = OrderService;
