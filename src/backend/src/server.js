import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import productRoutes from './routes/productRoutes.js';
import stockMovementRoutes from './routes/stockMovementRoutes.js';
import stockBalanceRoutes from './routes/stockBalanceRoutes.js';
import stockRoute from './routes/stockRoute.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 3000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.AVALIABLE_URL || 'http://localhost:5173',
  },
});

// Middleware
app.use(cors({
  origin: process.env.AVALIABLE_URL || 'http://localhost:5173',
}));
app.use(express.json());


app.use('/api/products', productRoutes);
app.use('/api/stock-moviments', stockMovementRoutes);
app.use('/api/stock-balances', stockBalanceRoutes);
app.use('/api/stock', stockRoute);
app.use('/api/users', userRoutes);


app.post('/webhook', (req, res) => {
  console.log('Webhook received:', req.body);
  io.emit('refresh');
  res.status(200).send('OK');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
