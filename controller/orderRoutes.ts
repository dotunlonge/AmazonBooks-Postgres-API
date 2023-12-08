import express, { Request, Response, Router } from 'express';
import OrderService from '../service/orderService';
import verifyToken from './middleware/verifyToken';

/**
 * Express router for handling order-related endpoints.
 */
const router: Router = express.Router();

/**
 * Create a new order.
 * @name POST /orders
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Response} - Returns JSON data for the new order or error message.
 */
router.post('/orders', verifyToken, async (req: Request, res: Response) => {
  const orderData = req.body; // Assuming the request body contains order data
  try {
    const newOrder = await OrderService.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

/**
 * Cancel an order by ID.
 * @name DELETE /orders/:id
 * @param {Request} req - The request object containing the order ID in the params.
 * @param {Response} res - The response object.
 * @returns {Response} - Returns success message or error if order not found or already cancelled.
 */
router.delete('/orders/:id', verifyToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const isCancelled = await OrderService.cancelOrder(Number(id));
    if (isCancelled) {
      res.json({ message: 'Order cancelled successfully' });
    } else {
      res.status(404).json({ message: 'Order not found or already cancelled' });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

/**
 * Retrieve order by ID.
 * @name GET /orders/:id
 * @param {Request} req - The request object containing the order ID in the params.
 * @param {Response} res - The response object.
 * @returns {Response} - Returns JSON data for the specific order or error message if not found.
 */
router.get('/orders/:id', verifyToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await OrderService.getOrderById(Number(id));
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
