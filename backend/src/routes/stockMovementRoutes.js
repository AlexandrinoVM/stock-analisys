import express from 'express';
import StockMovementController from '../controllers/stockMovementController.js';
import { authMiddleware } from '../middleware/authMiddlewere.js';

const router = express.Router();

router.get('/',authMiddleware, StockMovementController.getAll);
router.post('/', authMiddleware, StockMovementController.create);
router.put('/:id', authMiddleware, StockMovementController.update);
router.delete('/:id', authMiddleware, StockMovementController.delete);

export default router;