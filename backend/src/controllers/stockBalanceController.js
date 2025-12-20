import StockBalanceModel from '../models/stockBalanceModel.js';

class StockBalanceController {
  static async getAll(req, res) {
    try {
      const balances = await StockBalanceModel.getAll();
      res.json(balances);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const balance = await StockBalanceModel.create(req.body);
      res.json(balance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { product_id } = req.params;
      const balance = await StockBalanceModel.update(product_id, req.body);
      res.json(balance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { product_id } = req.params;
      await StockBalanceModel.delete(product_id);
      res.json({ message: 'Balance deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default StockBalanceController;