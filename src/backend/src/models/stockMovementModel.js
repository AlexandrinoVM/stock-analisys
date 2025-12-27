import StockBalanceModel from './stockBalanceModel.js';
import supabase from '../supabase.js';


class StockMovementModel {
  static async getAll() {
    const { data, error } = await supabase.from('stock_moviments').select('*');
    if (error) throw error;
    return data;
  }

  static async create(movement) {
    const { data, error } = await supabase.from('stock_moviments').insert(movement);
    if (error) throw error;

    // Update stock_balance
    const { product_id, quantity, type } = movement;
    const delta = type === 'in' ? quantity : -quantity;

    const { data: currentBalance } = await supabase
      .from('stock_balance')
      .select('quantity')
      .eq('product_id', product_id)
      .single();

    let newQuantity = delta;
    if (currentBalance) {
      newQuantity = currentBalance.quantity + delta;
    }
    await StockBalanceModel.update(product_id, { quantity: newQuantity });
    /*await supabase
      .from('stock_balance')
      .upsert({ product_id, quantity: newQuantity }, { onConflict: 'product_id' });
    */
    return data;
  }

  static async update(id, updates) {
    const { data, error } = await supabase.from('stock_moviments').update(updates).eq('id', id);
    if (error) throw error;
    return data;
  }

  static async delete(id) {
    const { error } = await supabase.from('stock_moviments').delete().eq('id', id);
    if (error) throw error;
  }
}

export default StockMovementModel;