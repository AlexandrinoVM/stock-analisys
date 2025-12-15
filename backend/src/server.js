require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const stockMovementRoutes = require('./routes/stockMovementRoutes');
const stockBalanceRoutes = require('./routes/stockBalanceRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/stock-moviments', stockMovementRoutes);
app.use('/api/stock-balances', stockBalanceRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
