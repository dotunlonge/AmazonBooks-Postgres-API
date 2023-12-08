import jwt, { VerifyErrors, Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repository/userRepository';

interface Decoded {
  userId: string | number;
}

// Define a custom interface extending the Express Request type
export interface AuthenticatedRequest extends Request {
  user?: Decoded;
}

/**
 * Middleware to verify and decode JWT token for authentication.
 * @param {AuthenticatedRequest} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Next middleware function.
 * @returns {Promise<void>} A promise resolving to void.
 */
async function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1]; // Assuming token is sent as 'Bearer <token>'
  if (!token || !process.env.JWT_SECRET_KEY) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }

  // Verify and decode the token
  jwt.verify(token, process.env.JWT_SECRET_KEY as Secret, async (err: VerifyErrors | null, decoded?: unknown) => {
    if (err || !decoded) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    const userId = typeof decoded === 'object' ? (decoded as Decoded).userId : null; // Check the type before accessing userId

    const user = await UserRepository.findById(userId as string | number);
    if (!user || user.token !== token) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Add the decoded payload to the request object
    req.user = decoded as Decoded;
    next();
  });
}

export default verifyToken;
