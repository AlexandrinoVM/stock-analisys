import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import stockMovementRoutes from './routes/stockMovementRoutes.js';
import stockBalanceRoutes from './routes/stockBalanceRoutes.js';
import stockRoute from './routes/stockRoute.js';
import userRoutes from './routes/userRoutes.js';
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.AVALIABLE_URL || 'http://localhost:5173',
}));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/stock-moviments', stockMovementRoutes);
app.use('/api/stock-balances', stockBalanceRoutes);
app.use('/api/stock', stockRoute);
app.use('/api/users', userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
