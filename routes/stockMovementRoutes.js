const express = require('express');
const StockMovementController = require('../controllers/stockMovementController');

const router = express.Router();

router.get('/', StockMovementController.getAll);
router.post('/', StockMovementController.create);
router.put('/:id', StockMovementController.update);
router.delete('/:id', StockMovementController.delete);

module.exports = router;