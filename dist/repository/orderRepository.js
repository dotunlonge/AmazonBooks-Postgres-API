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
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = require("../entity/Order"); // Import your Order and OrderItem models
const Book_1 = require("../entity/Book"); // Assuming you have a Book model
/**
 * A repository class for handling operations related to orders.
 */
class OrderRepository {
    /**
     * Creates a new order.
     * @param {Partial<Order>} orderData - The data for creating the order.
     * @returns {Promise<Order>} A promise that resolves to the created order.
     * @throws {Error} Throws an error if there's an issue creating the order.
     */
    static create(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newOrder = yield Order_1.Order.create(orderData);
                return newOrder;
            }
            catch (error) {
                throw new Error(`Error creating order: ${error.message}`);
            }
        });
    }
    /**
     * Cancels an order.
     * @param {number} orderId - The ID of the order to cancel.
     * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the order was cancelled.
     * @throws {Error} Throws an error if there's an issue cancelling the order.
     */
    static cancel(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [cancelledCount] = yield Order_1.Order.update({ status: 'cancelled' }, { where: { id: orderId } });
                return cancelledCount > 0; // Returns true if any order was cancelled
            }
            catch (error) {
                throw new Error(`Error cancelling order: ${error.message}`);
            }
        });
    }
    /**
     * Finds an order by its ID including associated items and books.
     * @param {number} id - The ID of the order to find.
     * @returns {Promise<Order | null>} A promise that resolves to the found order or null if not found.
     * @throws {Error} Throws an error if there's an issue finding the order.
     */
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield Order_1.Order.findByPk(id, {
                    include: [
                        {
                            model: Order_1.OrderItem,
                            include: [{ model: Book_1.Book, attributes: ['id', 'title', 'writer', 'point', 'tags'] }],
                        },
                    ],
                });
                return order;
            }
            catch (error) {
                throw new Error(`Error finding order: ${error.message}`);
            }
        });
    }
}
exports.default = OrderRepository;
