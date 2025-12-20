import express from 'express';
import StockMovementController from '../controllers/stockMovementController.js';

const router = express.Router();

router.get('/', StockMovementController.getAll);
router.post('/', StockMovementController.create);
router.put('/:id', StockMovementController.update);
router.delete('/:id', StockMovementController.delete);

export default router;