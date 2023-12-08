import { Sequelize } from 'sequelize';
import config from "../../config/config.json";

/**
 * Initializes a Sequelize instance.
 */
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: 'localhost',
  dialect: 'postgres'
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
export default sequelize;
