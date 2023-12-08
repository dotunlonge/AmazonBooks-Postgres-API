require("dotenv").config();

import express from 'express';
import bodyParser from 'body-parser';
import bookRoutes from './controller/bookRoutes';
import orderRoutes from './controller/orderRoutes';
import userRoutes from './controller/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', bookRoutes); // Mount book routes at /api/books
app.use('/api', orderRoutes); // Mount book routes at /api/order
app.use('/api', userRoutes); // Mount book routes at /api/user

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
