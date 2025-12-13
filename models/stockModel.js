const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

class StockModel {
  static async getAll() {
    const { data, error } = await supabase.from('stocks').select('*');
    if (error) throw error;
    return data;
  }

  static async create(stock) {
    const { data, error } = await supabase.from('stocks').insert(stock);
    if (error) throw error;
    return data;
  }

  static async update(id, updates) {
    const { data, error } = await supabase.from('stocks').update(updates).eq('id', id);
    if (error) throw error;
    return data;
  }

  static async delete(id) {
    const { error } = await supabase.from('stocks').delete().eq('id', id);
    if (error) throw error;
  }
}

module.exports = StockModel;
