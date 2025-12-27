import express from 'express';
import StockBalanceController from '../controllers/stockBalanceController.js';
import { authMiddleware } from '../middleware/authMiddlewere.js';

const router = express.Router();

router.get('/', authMiddleware,StockBalanceController.getAll);
router.post('/', authMiddleware, StockBalanceController.create);
router.put('/:product_id', authMiddleware, StockBalanceController.update);
router.delete('/:product_id', authMiddleware, StockBalanceController.delete);

export default router;