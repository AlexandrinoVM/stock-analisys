const { createClient } = require('@supabase/supabase-js');
const StockBalanceController = require('../controllers/stockBalanceController');
const StockBalanceModel = require('./stockBalanceModel');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

class ProductModel {
  static async getAll() {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    return data;
  }

  static async create(product) {
    const { data, error } = await supabase.from('products').insert(product).select().single();
    if (error) throw error;

    const product_id = data.id;
    await StockBalanceModel.create({ product_id, quantity:0 })

    return data;
  }

  static async update(id, updates) {
    const { data, error } = await supabase.from('products').update(updates).eq('id', id);
    if (error) throw error;
    return data;
  }

  static async delete(id) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
  }
}

module.exports = ProductModel;
