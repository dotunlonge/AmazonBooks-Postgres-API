import { Sequelize } from 'sequelize';
import config from "../../config/config.json";

let sequelize;

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // For development; use secure connection in production
      }
    }
  });
} else {
  sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: 'localhost',
    dialect: 'postgres'
  });
}

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
