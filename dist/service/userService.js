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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = __importDefault(require("../repository/userRepository"));
/**
 * Service class for user-related operations.
 */
class UserService {
    /**
     * Creates a new user.
     * @param userData - User data to create a new user.
     * @returns The newly created user.
     */
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
                const newUser = yield userRepository_1.default.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
                return newUser;
            }
            catch (error) {
                throw new Error(`Error creating user: ${error.message}`);
            }
        });
    }
    /**
     * Logs in a user and generates a JWT token upon successful login.
     * @param email - User's email.
     * @param password - User's password.
     * @returns user object + JWT token if login is successful, otherwise null.
     */
    static loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userRepository_1.default.findByEmail(email);
                if (!user) {
                    return null;
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordMatch) {
                    return null;
                }
                if (!process.env.JWT_SECRET_KEY)
                    throw new Error('No JWT Key');
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);
                if (token) {
                    const _user = Object.assign(Object.assign({}, user.dataValues), { token });
                    yield userRepository_1.default.update(_user);
                    return _user;
                }
                return null;
            }
            catch (error) {
                throw new Error(`Error logging in user: ${error.message}`);
            }
        });
    }
    /**
     * Logs out a user by clearing the token stored on the user model.
     * @param userId - User's ID.
     */
    static logoutUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userRepository_1.default.clearToken(userId);
            }
            catch (error) {
                throw new Error(`Error logging out user: ${error.message}`);
            }
        });
    }
}
exports.default = UserService;
