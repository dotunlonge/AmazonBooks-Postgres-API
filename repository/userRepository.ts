import { User } from '../entity/User'; // Import your User model

/**
 * Handles user-related database operations.
 */
class UserRepository {
  /**
   * Creates a new user.
   * @param {Partial<User>} userData - User data to create.
   * @returns {Promise<User>} - Returns the created user.
   */
  static async create(userData) {
    try {
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      throw new Error(`Error creating user: ${(error as Error).message}`);
    }
  }

  /**
   * Finds a user by email.
   * @param {string} email - Email to search for.
   * @returns {Promise<User | null>} - Returns the found user or null if not found.
   */
  static async findByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new Error(`Error finding user by email: ${(error as Error).message}`);
    }
  }

  /**
   * Finds a user by ID.
   * @param {number} id - ID of the user to find.
   * @returns {Promise<User | null>} - Returns the found user or null if not found.
   */
  static async findById(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw new Error(`Error finding user by ID: ${(error as Error).message}`);
    }
  }

  /**
   * Updates user information.
   * @param {Partial<User>} user - Updated user data.
   * @returns {Promise<[number, User[]]>} - Returns the number of affected rows and updated user.
   */
  static async update(user) {
    try {
      const [rowsAffected, updatedUser] = await User.update(user, {
        where: { id: user.id },
        returning: true,
      });
      return [rowsAffected, updatedUser];
    } catch (error) {
      throw new Error(`Error updating user: ${(error as Error).message}`);
    }
  }

  /**
   * Clears the token of a user.
   * @param {string | number} userId - ID of the user.
   * @returns {Promise<void>} - Returns a promise after clearing the token.
   */
  static async clearToken(userId) {
    const user = await User.findByPk(userId);
    if (user) {
      user.token = ''; // Assuming you have a field called 'token' on your User model
      await user.save();
    }
  }
}

export default UserRepository;
