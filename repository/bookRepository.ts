import { Book } from '../entity/Book';
import { Op } from 'sequelize';


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
  static async getPaginatedBooks(offset: number, limit: number): Promise<{ count: number, rows: Book[] }> {
    try {
      return await Book.findAndCountAll({
        offset,
        limit,
      });
    } catch (error) {
      throw new Error(`Error fetching paginated books: ${(error as Error).message}`);
    }
  }

  /**
   * Fetches all books.
   * @returns {Promise<Book[]>} A promise that resolves to all books.
   * @throws {Error} Throws an error if there's an issue fetching books.
   */
  static async getAllBooks(): Promise<Book[]> {
    try {
      const books = await Book.findAll();
      return books;
    } catch (error) {
      throw new Error(`Error fetching books: ${(error as Error).message}`);
    }
  }

  /**
   * Finds a book by its ID.
   * @param {number} id - The ID of the book to find.
   * @returns {Promise<Book | null>} A promise that resolves to the found book or null if not found.
   * @throws {Error} Throws an error if there's an issue fetching the book by ID.
   */
  static async findById(id: number): Promise<Book | null> {
    try {
      const book = await Book.findByPk(id);
      return book;
    } catch (error) {
      throw new Error(`Error fetching book by ID: ${(error as Error).message}`);
    }
  }

  /**
  * Adds a new book.
  * @param {Partial<Book>} newBookData - The data for the new book.
  * @returns {Promise<Book>} A promise that resolves to the newly created book.
  * @throws {Error} Throws an error if there's an issue adding a new book.
  */
 static async addBook(newBookData: Partial<Book>): Promise<Book> {
   try {
     const newBook = await Book.create(newBookData);
     return newBook;
   } catch (error) {
     throw new Error(`Error adding new book: ${(error as Error).message}`);
   }
 }

 /**
  * Updates a book by ID.
  * @param {number} id - The ID of the book to be updated.
  * @param {Partial<Book>} updatedBookData - The updated data for the book.
  * @returns {Promise<[number, Book[]]>} A promise that resolves to the number of affected rows and the updated book.
  * @throws {Error} Throws an error if there's an issue updating the book.
  */
 static async updateBook(id: number, updatedBookData: Partial<Book>): Promise<[number, Book[]]> {
   try {
     const [rowsAffected, updatedBook] = await Book.update(updatedBookData, {
       where: { id },
       returning: true,
     });
     return [rowsAffected, updatedBook];
   } catch (error) {
     throw new Error(`Error updating book: ${(error as Error).message}`);
   }
 }

 /**
  * Deletes a book by ID.
  * @param {number} id - The ID of the book to be deleted.
  * @returns {Promise<number>} A promise that resolves to the number of rows affected by deletion.
  * @throws {Error} Throws an error if there's an issue deleting the book.
  */
 static async deleteBook(id: number): Promise<number> {
   try {
     const rowsAffected = await Book.destroy({ where: { id } });
     return rowsAffected;
   } catch (error) {
     throw new Error(`Error deleting book: ${(error as Error).message}`);
   }
 }

 /**
  * Fetches books by tag.
  * @param {string} tag - The tag to search for in books.
  * @returns {Promise<Book[]>} A promise that resolves to books containing the specified tag.
  * @throws {Error} Throws an error if there's an issue fetching books by tag.
  */
 static async getBooksByTag(tag: string): Promise<Book[]> {
   try {
     const books = await Book.findAll({
       where: {
         tags: {
           [Op.contains]: [tag], // Get books that contain the specified tag
         },
       },
     });
     return books;
   } catch (error) {
     throw new Error(`Error fetching books by tag: ${(error as Error).message}`);
   }
 }
 
}

export default BookRepository;
