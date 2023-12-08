import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from './sequelize';

/**
 * Represents a Book in the database.
 */
export class Book extends Model {
  public id!: number;
  public title!: string;
  public writer!: string;
  public cover_image!: string;
  public point!: number;
  public tags!: string[];
}

/**
 * Initializes the Book model with Sequelize.
 * @param {Sequelize} sequelize - The Sequelize instance.
 */
Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: 'The unique identifier for the book.',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'The title of the book.',
    },
    writer: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'The writer/author of the book.',
    },
    cover_image: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'The URL of the cover image for the book.',
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'The points associated with the book.',
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      comment: 'The tags associated with the book.',
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
    comment: 'A table storing information about books.',
  }
);
