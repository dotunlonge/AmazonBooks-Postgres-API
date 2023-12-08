import BookRepository from '../repository/bookRepository';
import { Book } from '../entity/Book';

interface PaginatedBooksResponse {
  books: Book[];
  totalPages: number;
  nextPage: number | null;
}

class BookService {

  /**
    * Retrieves all books.
    * @returns A promise that resolves to an array of books.
    */
   static async getAllBooks(): Promise<Book[]> {
     try {
       return await BookRepository.getAllBooks();
     } catch (error) {
       throw new Error(`Error fetching books: ${(error as Error).message}`);
     }
   }

   /**
    * Retrieves a book by its ID.
    * @param id - The ID of the book to retrieve.
    * @returns A promise that resolves to a book object, or null if not found.
    */
   static async getBookById(id: number): Promise<Book | null> {
     try {
       return await BookRepository.findById(id);
     } catch (error) {
       throw new Error(`Error fetching book by ID: ${(error as Error).message}`);
     }
   }

   /**
      * Adds a new book.
      * @param {Partial<Book>} newBookData - The data for the new book.
      * @returns {Promise<Book>} A promise resolving to the added book.
      */
     static async addBook(newBookData: Partial<Book>): Promise<Book> {
       try {
         return await BookRepository.addBook(newBookData);
       } catch (error) {
         throw new Error(`Error adding new book: ${(error as Error).message}`);
       }
     }

     /**
      * Updates a book by ID.
      * @param {number} id - The ID of the book to update.
      * @param {Partial<Book>} updatedBookData - The updated data for the book.
      * @returns {Promise<[number, Book[]]>} A promise resolving to the number of affected rows and updated books.
      */
     static async updateBook(id: number, updatedBookData: Partial<Book>): Promise<[number, Book[]]> {
       try {
         return await BookRepository.updateBook(id, updatedBookData);
       } catch (error) {
         throw new Error(`Error updating book: ${(error as Error).message}`);
       }
     }

     /**
      * Deletes a book by ID.
      * @param {number} id - The ID of the book to delete.
      * @returns {Promise<number>} A promise resolving to the number of deleted books.
      */
     static async deleteBook(id: number): Promise<number> {
       try {
         return await BookRepository.deleteBook(id);
       } catch (error) {
         throw new Error(`Error deleting book: ${(error as Error).message}`);
       }
     }
     
  /**
   * Retrieves books by a specific tag.
   * @param tag - The tag to filter books.
   * @returns A promise that resolves to an array of books.
   */
  static async getBooksByTag(tag: string): Promise<Book[]> {
    try {
      return await BookRepository.getBooksByTag(tag);
    } catch (error) {
      throw new Error(`Error fetching books by tag: ${(error as Error).message}`);
    }
  }

  /**
   * Retrieves books in a paginated format.
   * @param pageNumber - The page number for pagination.
   * @param chunkSize - The number of books per page.
   * @returns A promise that resolves to a paginated response containing books, total pages, and the next page number.
   */
  static async getPaginatedBooks(pageNumber: number, chunkSize: number): Promise<PaginatedBooksResponse> {
    const offset = (pageNumber - 1) * chunkSize;
    const limit = chunkSize;

    try {
      const { count, rows: books } = await BookRepository.getPaginatedBooks(offset, limit);

      const totalPages = Math.ceil(count / chunkSize);
      const nextPage = pageNumber < totalPages ? pageNumber + 1 : null;

      return {
        books,
        totalPages,
        nextPage,
      };
    } catch (error) {
      throw new Error(`Error fetching paginated books: ${(error as Error).message}`);
    }
  }

}

export default BookService;
