import StockMovementModel from '../models/stockMovementModel.js';

class StockMovementController {
  static async getAll(req, res) {
    try {
      const movements = await StockMovementModel.getAll();
      res.json(movements);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const movement = await StockMovementModel.create(req.body);
      res.json(movement);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const movement = await StockMovementModel.update(id, req.body);
      res.json(movement);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await StockMovementModel.delete(id);
      res.json({ message: 'Movement deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default StockMovementController;