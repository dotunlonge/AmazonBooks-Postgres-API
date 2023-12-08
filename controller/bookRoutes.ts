import express, { Request, Response } from 'express';
import BookService from '../service/bookService'; // Import the BookService
import { Book } from "../entity/Book";
import verifyToken from "./middleware/verifyToken";

const router = express.Router();

/**
 * GET paginated books
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Returns a paginated list of books
 */
 router.get('/books', async (req: Request, res: Response) => {
  const { page = 1, size = 10 } = req.query; // Assuming 'page' and 'size' are sent as query parameters
  const pageNumber = parseInt(page as string, 10);
  const chunkSize = parseInt(size as string, 10);

  try {
    const paginatedBooks = await BookService.getPaginatedBooks(pageNumber, chunkSize);
    res.json(paginatedBooks);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

/**
 * GET book by ID
 * @param {Request} req - Express Request object with book ID parameter
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Returns the book or a 'Book not found' message
 */
router.get('/books/:id', async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const book: Book | null = await BookService.getBookById(Number(id));

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.json(book);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
});
/**
 * POST add a new book
 * @param {Request} req - Express Request object with book data in the body
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Returns the newly added book or an error message
 */
router.post('/books', verifyToken, async (req: Request, res: Response): Promise<Response> => {
  const newBookData: Book = req.body; // Assuming the request body contains book data

  try {
    const newBook: Book = await BookService.addBook(newBookData);
    return res.status(201).json(newBook);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
});

/**
 * PUT update book by ID
 * @param {Request} req - Express Request object with book ID parameter and updated book data in the body
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Returns the updated book or a 'No Change Effected' message
 */
router.put('/books/:id', verifyToken, async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const updatedBookData: Partial<Book> = req.body; // Assuming the request body contains updated book data

  try {
    const [rowsAffected, updatedBook]: [number, Book[]] = await BookService.updateBook(Number(id), updatedBookData);
    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'No Change Effected' });
    }
    return res.json(updatedBook);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
});

/**
 * DELETE book by ID
 * @param {Request} req - Express Request object with book ID parameter
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Returns a success message or 'Book not found' error
 */
router.delete('/books/:id', verifyToken, async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const rowsAffected: number = await BookService.deleteBook(Number(id));
    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
});

/**
 * GET books by tag
 * @param {Request} req - Express Request object with tag parameter
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Returns books filtered by tag or an error message
 */
router.get('/books/tag/:tag', async (req: Request, res: Response): Promise<Response> => {
  const { tag } = req.params;

  try {
    const books: Book[] = await BookService.getBooksByTag(tag);
    return res.json(books);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
