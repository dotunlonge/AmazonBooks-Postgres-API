"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = exports.Order = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
const Book_1 = require("./Book"); // Assuming you have a Book model
/**
 * Represents an order made by a user for books.
 */
class Order extends sequelize_1.Model {
}
exports.Order = Order;
/**
 * Initialize the Order model with Sequelize.
 * @param {Sequelize} sequelize - The Sequelize instance.
 */
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: 'The unique identifier for the order.',
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        comment: 'The ID of the user who placed the order.',
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'pending',
        comment: 'The status of the order.',
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'Order',
    tableName: 'orders',
    comment: 'A table storing information about orders.',
});
class OrderItem extends sequelize_1.Model {
}
exports.OrderItem = OrderItem;
OrderItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: 'The unique identifier for the order item.',
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'The ID of the order.',
    },
    bookId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Book_1.Book,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'The ID of the book included in the order item.',
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        comment: 'The quantity of the book included in the order item.',
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'OrderItem',
    tableName: 'order_items',
    comment: 'A table storing information about order items.',
});
OrderItem.belongsTo(Book_1.Book, { foreignKey: 'bookId' });
// Define associations between Order and OrderItem
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
// Define associations between Book and OrderItem
Book_1.Book.belongsToMany(Order, { through: OrderItem, foreignKey: 'bookId' });
Order.belongsToMany(Book_1.Book, { through: OrderItem, foreignKey: 'orderId' });
exports.default = Order;
