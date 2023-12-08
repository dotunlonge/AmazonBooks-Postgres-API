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
const userService_1 = __importDefault(require("../service/userService")); // Import the UserService
const verifyToken_1 = __importDefault(require("./middleware/verifyToken"));
const router = express_1.default.Router();
/**
 * Create a new user.
 * @name POST /user/signup
 * @param {Request} req - The request object containing user data in the body.
 * @param {Response} res - The response object.
 * @returns {Response} - Returns JSON data for the new user or error message.
 */
router.post('/user/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    try {
        const newUser = yield userService_1.default.createUser(userData);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
/**
 * Login user.
 * @name POST /user/login
 * @param {Request} req - The request object containing email and password in the body.
 * @param {Response} res - The response object.
 * @returns {Response} - Returns a success message and user details on successful login or error message.
 */
router.post('/user/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userService_1.default.loginUser(email, password);
        if (user) {
            res.setHeader('Authorization', `Bearer ${user.token}`);
            res.json({ message: 'Login successful', user });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
/**
 * Logout user.
 * @name POST /user/logout
 * @param {AuthenticatedRequest} req - The authenticated request object with user details.
 * @param {Response} res - The response object.
 * @returns {Response} - Returns a success message on logout or error message if unauthorized.
 */
router.post('/user/logout', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        yield userService_1.default.logoutUser(userId);
        res.json({ message: 'Logout successful' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.default = router;
