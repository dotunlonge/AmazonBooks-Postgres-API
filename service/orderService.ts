import OrderRepository from '../repository/orderRepository';
import { Order, OrderItem } from '../entity/Order';
import BookRepository from '../repository/bookRepository';
import { Book } from '../entity/Book';

/**
 * Service handling order-related operations.
 */
class OrderService {
  /**
   * Creates a new order.
   * @param {Partial<Order>} orderData - Data for creating the order.
   * @returns {Promise<Order>} - Returns the newly created order.
   */
  static async createOrder(orderData) {
    try {
      const { books, ...orderAttributes } = orderData;

      if (!books || books.length === 0) {
        throw new Error('At least one book must be provided for the order');
      }

      const invalidBookIds = [];
      for (const bookData of books) {
        const { bookId, quantity } = bookData;
        const bookExists = await BookRepository.findById(bookId);

        if (!bookExists) {
          invalidBookIds.push(bookId);
        }
      }

      if (invalidBookIds.length > 0) {
        throw new Error(`Books not found: ${invalidBookIds.join(', ')}`);
      }

      const newOrder = await Order.create(orderAttributes);

      // Create order items for each book with quantities
      for (const bookData of books) {
        const { bookId, quantity } = bookData;

        await OrderItem.create({
          orderId: newOrder.id,
          bookId,
          quantity,
        });
      }

      return newOrder;
    } catch (error) {
      throw new Error(`Error creating order: ${(error as Error).message}`);
    }
  }

  /**
   * Cancels an order by ID.
   * @param {number} orderId - ID of the order to cancel.
   * @returns {Promise<boolean>} - Returns true if the order was successfully cancelled.
   */
  static async cancelOrder(orderId) {
    try {
      const isCancelled = await OrderRepository.cancel(orderId);
      return isCancelled;
    } catch (error) {
      throw new Error(`Error cancelling order: ${(error as Error).message}`);
    }
  }

  /**
   * Retrieves an order by its ID.
   * @param {number} orderId - ID of the order to retrieve.
   * @returns {Promise<Order | null>} - Returns the order if found, otherwise null.
   */
  static async getOrderById(orderId) {
    try {
      const order = await OrderRepository.findById(orderId);
      return order;
    } catch (error) {
      throw new Error(`Error fetching order: ${(error as Error).message}`);
    }
  }
}

export default OrderService;
