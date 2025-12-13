const express = require('express');
const StockController = require('../controllers/stockController');

const router = express.Router();

router.get('/', StockController.getAll);
router.post('/', StockController.create);
router.put('/:id', StockController.update);
router.delete('/:id', StockController.delete);

module.exports = router;
