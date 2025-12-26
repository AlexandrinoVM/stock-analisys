import express from 'express';
import StockController from '../controllers/stockController.js';
import { authMiddleware } from '../middleware/authMiddlewere.js';

const router = express.Router();

router.get('/',authMiddleware, StockController.getStockData);

export default router;