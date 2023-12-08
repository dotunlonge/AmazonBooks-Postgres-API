import { Order, OrderItem } from '../entity/Order'; // Import your Order and OrderItem models
import { Book } from '../entity/Book'; // Assuming you have a Book model

/**
 * A repository class for handling operations related to orders.
 */
class OrderRepository {
  /**
   * Creates a new order.
   * @param {Partial<Order>} orderData - The data for creating the order.
   * @returns {Promise<Order>} A promise that resolves to the created order.
   * @throws {Error} Throws an error if there's an issue creating the order.
   */
  static async create(orderData: Partial<Order>): Promise<Order> {
    try {
      const newOrder = await Order.create(orderData);
      return newOrder;
    } catch (error) {
      throw new Error(`Error creating order: ${(error as Error).message}`);
    }
  }

  /**
   * Cancels an order.
   * @param {number} orderId - The ID of the order to cancel.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the order was cancelled.
   * @throws {Error} Throws an error if there's an issue cancelling the order.
   */
  static async cancel(orderId: number): Promise<boolean> {
    try {
      const [cancelledCount] = await Order.update({ status: 'cancelled' }, { where: { id: orderId } });
      return cancelledCount > 0; // Returns true if any order was cancelled
    } catch (error) {
      throw new Error(`Error cancelling order: ${(error as Error).message}`);
    }
  }

  /**
   * Finds an order by its ID including associated items and books.
   * @param {number} id - The ID of the order to find.
   * @returns {Promise<Order | null>} A promise that resolves to the found order or null if not found.
   * @throws {Error} Throws an error if there's an issue finding the order.
   */
  static async findById(id: number): Promise<Order | null> {
    try {
      const order = await Order.findByPk(id, {
        include: [
          {
            model: OrderItem,
            include: [{ model: Book, attributes: ['id', 'title', 'writer', 'point', 'tags'] }],
          },
        ],
      });
      return order;
    } catch (error) {
      throw new Error(`Error finding order: ${(error as Error).message}`);
    }
  }
}

export default OrderRepository;
