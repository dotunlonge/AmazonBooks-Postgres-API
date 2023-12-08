import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserRepository from '../repository/userRepository';
import { User } from '../entity/User';
import { Book } from '../entity/Book';

/**
 * Service class for user-related operations.
 */
class UserService {

  /**
   * Creates a new user.
   * @param userData - User data to create a new user.
   * @returns The newly created user.
   */
  static async createUser(userData: User): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = await UserRepository.create({ ...userData, password: hashedPassword });
      return newUser;
    } catch (error) {
      throw new Error(`Error creating user: ${(error as Error).message}`);
    }
  }

  /**
   * Logs in a user and generates a JWT token upon successful login.
   * @param email - User's email.
   * @param password - User's password.
   * @returns user object + JWT token if login is successful, otherwise null.
   */
  static async loginUser(email: string, password: string): Promise<object | null> {
    try {
      const user = await UserRepository.findByEmail(email);
      if (!user) {
        return null;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return null;
      }

      if (!process.env.JWT_SECRET_KEY) throw new Error('No JWT Key');

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);

      if (token) {
        const _user = { ...user.dataValues, token };
        await UserRepository.update(_user);
        return _user;
      }

      return null;

    } catch (error) {
      throw new Error(`Error logging in user: ${(error as Error).message}`);
    }
  }

  /**
   * Logs out a user by clearing the token stored on the user model.
   * @param userId - User's ID.
   */
  static async logoutUser(userId: string | number): Promise<void> {
    try {
      await UserRepository.clearToken(userId);
    } catch (error) {
      throw new Error(`Error logging out user: ${(error as Error).message}`);
    }
  }
}

export default UserService;
