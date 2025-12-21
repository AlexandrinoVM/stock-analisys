import StockBalanceModel from './stockBalanceModel.js';
import supabase from '../supabase.js';

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
    const quantity = data.quantity || 0;
    await StockBalanceModel.create({ product_id, quantity });

    return data;
  }

  static async update(id, updates) {
    const { data, error } = await supabase.from('products').update(updates).eq('id', id);
    if (error) throw error;
    return data;
  }

  static async delete(id) {
    const {error: balanceError} = await supabase.from('stock_balance').delete().eq('product_id', id);
    if (balanceError) throw balanceError;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    
  }
}

export default ProductModel;
