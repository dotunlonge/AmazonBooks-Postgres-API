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
const User_1 = require("../entity/User"); // Import your User model
/**
 * Handles user-related database operations.
 */
class UserRepository {
    /**
     * Creates a new user.
     * @param {Partial<User>} userData - User data to create.
     * @returns {Promise<User>} - Returns the created user.
     */
    static create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield User_1.User.create(userData);
                return newUser;
            }
            catch (error) {
                throw new Error(`Error creating user: ${error.message}`);
            }
        });
    }
    /**
     * Finds a user by email.
     * @param {string} email - Email to search for.
     * @returns {Promise<User | null>} - Returns the found user or null if not found.
     */
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({ where: { email } });
                return user;
            }
            catch (error) {
                throw new Error(`Error finding user by email: ${error.message}`);
            }
        });
    }
    /**
     * Finds a user by ID.
     * @param {number} id - ID of the user to find.
     * @returns {Promise<User | null>} - Returns the found user or null if not found.
     */
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findByPk(id);
                return user;
            }
            catch (error) {
                throw new Error(`Error finding user by ID: ${error.message}`);
            }
        });
    }
    /**
     * Updates user information.
     * @param {Partial<User>} user - Updated user data.
     * @returns {Promise<[number, User[]]>} - Returns the number of affected rows and updated user.
     */
    static update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rowsAffected, updatedUser] = yield User_1.User.update(user, {
                    where: { id: user.id },
                    returning: true,
                });
                return [rowsAffected, updatedUser];
            }
            catch (error) {
                throw new Error(`Error updating user: ${error.message}`);
            }
        });
    }
    /**
     * Clears the token of a user.
     * @param {string | number} userId - ID of the user.
     * @returns {Promise<void>} - Returns a promise after clearing the token.
     */
    static clearToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findByPk(userId);
            if (user) {
                user.token = ''; // Assuming you have a field called 'token' on your User model
                yield user.save();
            }
        });
    }
}
exports.default = UserRepository;
