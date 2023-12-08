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
const Book_1 = require("../entity/Book");
const sequelize_1 = require("sequelize");
/**
 * A repository class for handling operations related to books.
 */
class BookRepository {
    /**
     * Fetches paginated books.
     * @param {number} offset - The offset for pagination.
     * @param {number} limit - The limit of books to fetch per page.
     * @returns {Promise<{ count: number, rows: Book[] }>} A promise that resolves to paginated books.
     * @throws {Error} Throws an error if there's an issue fetching paginated books.
     */
    static getPaginatedBooks(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Book_1.Book.findAndCountAll({
                    offset,
                    limit,
                });
            }
            catch (error) {
                throw new Error(`Error fetching paginated books: ${error.message}`);
            }
        });
    }
    /**
     * Fetches all books.
     * @returns {Promise<Book[]>} A promise that resolves to all books.
     * @throws {Error} Throws an error if there's an issue fetching books.
     */
    static getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield Book_1.Book.findAll();
                return books;
            }
            catch (error) {
                throw new Error(`Error fetching books: ${error.message}`);
            }
        });
    }
    /**
     * Finds a book by its ID.
     * @param {number} id - The ID of the book to find.
     * @returns {Promise<Book | null>} A promise that resolves to the found book or null if not found.
     * @throws {Error} Throws an error if there's an issue fetching the book by ID.
     */
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield Book_1.Book.findByPk(id);
                return book;
            }
            catch (error) {
                throw new Error(`Error fetching book by ID: ${error.message}`);
            }
        });
    }
    /**
    * Adds a new book.
    * @param {Partial<Book>} newBookData - The data for the new book.
    * @returns {Promise<Book>} A promise that resolves to the newly created book.
    * @throws {Error} Throws an error if there's an issue adding a new book.
    */
    static addBook(newBookData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newBook = yield Book_1.Book.create(newBookData);
                return newBook;
            }
            catch (error) {
                throw new Error(`Error adding new book: ${error.message}`);
            }
        });
    }
    /**
     * Updates a book by ID.
     * @param {number} id - The ID of the book to be updated.
     * @param {Partial<Book>} updatedBookData - The updated data for the book.
     * @returns {Promise<[number, Book[]]>} A promise that resolves to the number of affected rows and the updated book.
     * @throws {Error} Throws an error if there's an issue updating the book.
     */
    static updateBook(id, updatedBookData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rowsAffected, updatedBook] = yield Book_1.Book.update(updatedBookData, {
                    where: { id },
                    returning: true,
                });
                return [rowsAffected, updatedBook];
            }
            catch (error) {
                throw new Error(`Error updating book: ${error.message}`);
            }
        });
    }
    /**
     * Deletes a book by ID.
     * @param {number} id - The ID of the book to be deleted.
     * @returns {Promise<number>} A promise that resolves to the number of rows affected by deletion.
     * @throws {Error} Throws an error if there's an issue deleting the book.
     */
    static deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rowsAffected = yield Book_1.Book.destroy({ where: { id } });
                return rowsAffected;
            }
            catch (error) {
                throw new Error(`Error deleting book: ${error.message}`);
            }
        });
    }
    /**
     * Fetches books by tag.
     * @param {string} tag - The tag to search for in books.
     * @returns {Promise<Book[]>} A promise that resolves to books containing the specified tag.
     * @throws {Error} Throws an error if there's an issue fetching books by tag.
     */
    static getBooksByTag(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield Book_1.Book.findAll({
                    where: {
                        tags: {
                            [sequelize_1.Op.contains]: [tag], // Get books that contain the specified tag
                        },
                    },
                });
                return books;
            }
            catch (error) {
                throw new Error(`Error fetching books by tag: ${error.message}`);
            }
        });
    }
}
exports.default = BookRepository;
