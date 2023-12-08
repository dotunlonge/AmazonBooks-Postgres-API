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
const bookRepository_1 = __importDefault(require("../repository/bookRepository"));
class BookService {
    /**
      * Retrieves all books.
      * @returns A promise that resolves to an array of books.
      */
    static getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bookRepository_1.default.getAllBooks();
            }
            catch (error) {
                throw new Error(`Error fetching books: ${error.message}`);
            }
        });
    }
    /**
     * Retrieves a book by its ID.
     * @param id - The ID of the book to retrieve.
     * @returns A promise that resolves to a book object, or null if not found.
     */
    static getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bookRepository_1.default.findById(id);
            }
            catch (error) {
                throw new Error(`Error fetching book by ID: ${error.message}`);
            }
        });
    }
    /**
       * Adds a new book.
       * @param {Partial<Book>} newBookData - The data for the new book.
       * @returns {Promise<Book>} A promise resolving to the added book.
       */
    static addBook(newBookData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bookRepository_1.default.addBook(newBookData);
            }
            catch (error) {
                throw new Error(`Error adding new book: ${error.message}`);
            }
        });
    }
    /**
     * Updates a book by ID.
     * @param {number} id - The ID of the book to update.
     * @param {Partial<Book>} updatedBookData - The updated data for the book.
     * @returns {Promise<[number, Book[]]>} A promise resolving to the number of affected rows and updated books.
     */
    static updateBook(id, updatedBookData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bookRepository_1.default.updateBook(id, updatedBookData);
            }
            catch (error) {
                throw new Error(`Error updating book: ${error.message}`);
            }
        });
    }
    /**
     * Deletes a book by ID.
     * @param {number} id - The ID of the book to delete.
     * @returns {Promise<number>} A promise resolving to the number of deleted books.
     */
    static deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bookRepository_1.default.deleteBook(id);
            }
            catch (error) {
                throw new Error(`Error deleting book: ${error.message}`);
            }
        });
    }
    /**
     * Retrieves books by a specific tag.
     * @param tag - The tag to filter books.
     * @returns A promise that resolves to an array of books.
     */
    static getBooksByTag(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bookRepository_1.default.getBooksByTag(tag);
            }
            catch (error) {
                throw new Error(`Error fetching books by tag: ${error.message}`);
            }
        });
    }
    /**
     * Retrieves books in a paginated format.
     * @param pageNumber - The page number for pagination.
     * @param chunkSize - The number of books per page.
     * @returns A promise that resolves to a paginated response containing books, total pages, and the next page number.
     */
    static getPaginatedBooks(pageNumber, chunkSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (pageNumber - 1) * chunkSize;
            const limit = chunkSize;
            try {
                const { count, rows: books } = yield bookRepository_1.default.getPaginatedBooks(offset, limit);
                const totalPages = Math.ceil(count / chunkSize);
                const nextPage = pageNumber < totalPages ? pageNumber + 1 : null;
                return {
                    books,
                    totalPages,
                    nextPage,
                };
            }
            catch (error) {
                throw new Error(`Error fetching paginated books: ${error.message}`);
            }
        });
    }
}
exports.default = BookService;
