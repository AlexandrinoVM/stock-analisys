import express from 'express';
import StockController from '../controllers/stockController.js';

const router = express.Router();

router.get('/', StockController.getStockData);

export default router;