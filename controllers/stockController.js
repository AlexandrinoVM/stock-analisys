const StockModel = require('../models/stockModel');

class StockController {
  static async getAll(req, res) {
    try {
      const stocks = await StockModel.getAll();
      res.json(stocks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const stock = await StockModel.create(req.body);
      res.json(stock);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const stock = await StockModel.update(id, req.body);
      res.json(stock);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await StockModel.delete(id);
      res.json({ message: 'Stock deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = StockController;
