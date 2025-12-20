import { useState, useEffect } from "react";
import { GetProducts } from "../services/productService.jsx";
export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts(){
            try {
                const data = await GetProducts();
                setProducts(data);
            }catch (err) {
                setError(err.message);
            }finally {
                setLoading(false);
            }
            
        }
        fetchProducts();
        
    }, []);

    return {products, loading, error};
}