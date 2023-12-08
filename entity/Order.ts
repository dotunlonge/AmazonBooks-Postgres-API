import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';
import { Book } from './Book'; // Assuming you have a Book model

/**
 * Represents an order made by a user for books.
 */
export class Order extends Model {
  public id!: number;
  public userId!: number;
  public status!: string;
}

/**
 * Initialize the Order model with Sequelize.
 * @param {Sequelize} sequelize - The Sequelize instance.
 */
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: 'The unique identifier for the order.',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'The ID of the user who placed the order.',
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      comment: 'The status of the order.',
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    comment: 'A table storing information about orders.',
  }
);

export class OrderItem extends Model {
  public id!: number;
  public orderId!: number;
  public bookId!: number;
  public quantity!: number;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: 'The unique identifier for the order item.',
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      comment: 'The ID of the order.',
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      comment: 'The ID of the book included in the order item.',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'The quantity of the book included in the order item.',
    },
  },
  {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_items',
    comment: 'A table storing information about order items.',
  }
);

OrderItem.belongsTo(Book, { foreignKey: 'bookId' });

// Define associations between Order and OrderItem
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// Define associations between Book and OrderItem
Book.belongsToMany(Order, { through: OrderItem, foreignKey: 'bookId' });
Order.belongsToMany(Book, { through: OrderItem, foreignKey: 'orderId' });

export default Order;
