import express, { Request, Response } from 'express';
import UserService from '../service/userService'; // Import the UserService
import verifyToken, { AuthenticatedRequest } from './middleware/verifyToken';

const router = express.Router();

/**
 * Create a new user.
 * @name POST /user/signup
 * @param {Request} req - The request object containing user data in the body.
 * @param {Response} res - The response object.
 * @returns {Response} - Returns JSON data for the new user or error message.
 */
router.post('/user/signup', async (req: Request, res: Response) => {
  const userData = req.body;
  try {
    const newUser = await UserService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

/**
 * Login user.
 * @name POST /user/login
 * @param {Request} req - The request object containing email and password in the body.
 * @param {Response} res - The response object.
 * @returns {Response} - Returns a success message and user details on successful login or error message.
 */
router.post('/user/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await UserService.loginUser(email, password);
    if (user) {
      res.setHeader('Authorization', `Bearer ${user.token}`);
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

/**
 * Logout user.
 * @name POST /user/logout
 * @param {AuthenticatedRequest} req - The authenticated request object with user details.
 * @param {Response} res - The response object.
 * @returns {Response} - Returns a success message on logout or error message if unauthorized.
 */
router.post('/user/logout', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await UserService.logoutUser(userId);
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
