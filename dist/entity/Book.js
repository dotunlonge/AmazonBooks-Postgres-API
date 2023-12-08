"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
/**
 * Represents a Book in the database.
 */
class Book extends sequelize_1.Model {
}
exports.Book = Book;
/**
 * Initializes the Book model with Sequelize.
 * @param {Sequelize} sequelize - The Sequelize instance.
 */
Book.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: 'The unique identifier for the book.',
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        comment: 'The title of the book.',
    },
    writer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        comment: 'The writer/author of the book.',
    },
    cover_image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        comment: 'The URL of the cover image for the book.',
    },
    point: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        comment: 'The points associated with the book.',
    },
    tags: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false,
        comment: 'The tags associated with the book.',
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'Book',
    tableName: 'books',
    comment: 'A table storing information about books.',
});
