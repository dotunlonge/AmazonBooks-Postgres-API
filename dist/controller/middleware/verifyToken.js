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
const userRepository_1 = __importDefault(require("../../repository/userRepository"));
/**
 * Middleware to verify and decode JWT token for authentication.
 * @param {AuthenticatedRequest} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Next middleware function.
 * @returns {Promise<void>} A promise resolving to void.
 */
function verifyToken(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // Get the token from the Authorization header
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Assuming token is sent as 'Bearer <token>'
        if (!token || !process.env.JWT_SECRET_KEY) {
            return res.status(401).json({ message: 'Unauthorized: Token not provided' });
        }
        // Verify and decode the token
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
            if (err || !decoded) {
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }
            const userId = typeof decoded === 'object' ? decoded.userId : null; // Check the type before accessing userId
            const user = yield userRepository_1.default.findById(userId);
            if (!user || user.token !== token) {
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }
            // Add the decoded payload to the request object
            req.user = decoded;
            next();
        }));
    });
}
exports.default = verifyToken;
