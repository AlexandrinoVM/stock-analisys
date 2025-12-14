const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

class StockBalanceModel {
  static async getAll() {
    const { data, error } = await supabase.from('stock_balance').select('*');
    if (error) throw error;
    return data;
  }

  static async create(balance) {
    const { data, error } = await supabase.from('stock_balance').insert(balance);
    if (error) throw error;
    return data;
  }

  static async update(product_id, updates) {
    const { data, error } = await supabase.from('stock_balance').update(updates).eq('product_id', product_id);
    if (error) throw error;
    return data;
  }

  static async delete(product_id) {
    const { error } = await supabase.from('stock_balance').delete().eq('product_id', product_id);
    if (error) throw error;
  }
}

module.exports = StockBalanceModel;