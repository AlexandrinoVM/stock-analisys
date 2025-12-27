import supabase from "../supabase.js";
class StockService {
    static async  getStock(){
        const { data:products, error:productsError } = await supabase
            .from('products')
            .select('*');

        if(productsError)throw new Error(productsError.message);

        const { data:moviments, error:movimentsError } = await supabase
            .from('stock_moviments')
            .select('*');
        if(movimentsError)throw new Error(movimentsError.message);


        const {data:balances, error:balancesError} = await supabase
            .from('stock_balance')
            .select('*');
        if(balancesError)throw new Error(balancesError.message);


        const final = products.map(product =>({
            ...product,
            balance: balances.find(b => b.product_id === product.id) || { quantity: 0 },
            moviments: moviments.filter(m => m.product_id === product.id)
        }))

        return final
    }
    }

export default StockService