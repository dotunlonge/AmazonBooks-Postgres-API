"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
/**
 * Represents a user in the system.
 */
class User extends sequelize_1.Model {
}
exports.User = User;
/**
 * Initialize the User model with Sequelize.
 * @param {Sequelize} sequelize - The Sequelize instance.
 */
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: 'The unique identifier for the user.',
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        comment: 'The user header token.'
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'The email address of the user.',
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        comment: 'The password associated with the user account.',
    },
    points: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100,
        comment: 'The points accumulated by the user.',
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'User',
    tableName: 'users',
    comment: 'A table storing information about users.',
});
