const express = require('express');
const StockBalanceController = require('../controllers/stockBalanceController');

const router = express.Router();

router.get('/', StockBalanceController.getAll);
router.post('/', StockBalanceController.create);
router.put('/:product_id', StockBalanceController.update);
router.delete('/:product_id', StockBalanceController.delete);

module.exports = router;