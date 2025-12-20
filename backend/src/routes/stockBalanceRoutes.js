import express from 'express';
import StockBalanceController from '../controllers/stockBalanceController.js';

const router = express.Router();

router.get('/', StockBalanceController.getAll);
router.post('/', StockBalanceController.create);
router.put('/:product_id', StockBalanceController.update);
router.delete('/:product_id', StockBalanceController.delete);

export default router;