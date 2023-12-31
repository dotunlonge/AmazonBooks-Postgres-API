"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_json_1 = __importDefault(require("../../config/config.json"));
let sequelize;
if (process.env.NODE_ENV === 'production') {
    sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // For development; use secure connection in production
            }
        }
    });
}
else {
    sequelize = new sequelize_1.Sequelize(config_json_1.default.development.database, config_json_1.default.development.username, config_json_1.default.development.password, {
        host: 'localhost',
        dialect: 'postgres'
    });
}
// Test the connection
sequelize.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
exports.default = sequelize;
