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
const bookService_1 = __importDefault(require("../service/bookService")); // Import the BookService
const verifyToken_1 = __importDefault(require("./middleware/verifyToken"));
const router = express_1.default.Router();
/**
 * GET paginated books
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Returns a paginated list of books
 */
router.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, size = 10 } = req.query; // Assuming 'page' and 'size' are sent as query parameters
    const pageNumber = parseInt(page, 10);
    const chunkSize = parseInt(size, 10);
    try {
        const paginatedBooks = yield bookService_1.default.getPaginatedBooks(pageNumber, chunkSize);
        res.json(paginatedBooks);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
/**
 * GET book by ID
 * @param {Request} req - Express Request object with book ID parameter
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Returns the book or a 'Book not found' message
 */
router.get('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const book = yield bookService_1.default.getBookById(Number(id));
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.json(book);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}));
/**
 * POST add a new book
 * @param {Request} req - Express Request object with book data in the body
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Returns the newly added book or an error message
 */
router.post('/books', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBookData = req.body; // Assuming the request body contains book data
    try {
        const newBook = yield bookService_1.default.addBook(newBookData);
        return res.status(201).json(newBook);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}));
/**
 * PUT update book by ID
 * @param {Request} req - Express Request object with book ID parameter and updated book data in the body
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Returns the updated book or a 'No Change Effected' message
 */
router.put('/books/:id', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedBookData = req.body; // Assuming the request body contains updated book data
    try {
        const [rowsAffected, updatedBook] = yield bookService_1.default.updateBook(Number(id), updatedBookData);
        if (rowsAffected === 0) {
            return res.status(404).json({ message: 'No Change Effected' });
        }
        return res.json(updatedBook);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}));
/**
 * DELETE book by ID
 * @param {Request} req - Express Request object with book ID parameter
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Returns a success message or 'Book not found' error
 */
router.delete('/books/:id', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const rowsAffected = yield bookService_1.default.deleteBook(Number(id));
        if (rowsAffected === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.json({ message: 'Book deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}));
/**
 * GET books by tag
 * @param {Request} req - Express Request object with tag parameter
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Returns books filtered by tag or an error message
 */
router.get('/books/tag/:tag', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tag } = req.params;
    try {
        const books = yield bookService_1.default.getBooksByTag(tag);
        return res.json(books);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}));
exports.default = router;
