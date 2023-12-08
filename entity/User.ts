import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

/**
 * Represents a user in the system.
 */
export class User extends Model {
  /** The unique identifier for the user. */
  public id!: number;

  /** The email address of the user. */
  public email!: string;

  /** The password associated with the user's account. */
  public password!: string;

  /** The points accumulated by the user. */
  public points!: number;

  public token!: string;
}

/**
 * Initialize the User model with Sequelize.
 * @param {Sequelize} sequelize - The Sequelize instance.
 */
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: 'The unique identifier for the user.',
    },
    token: {
      type: DataTypes.STRING,
      comment: 'The user header token.'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: 'The email address of the user.',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'The password associated with the user account.',
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
      comment: 'The points accumulated by the user.',
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    comment: 'A table storing information about users.',
  }
);
