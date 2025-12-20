import { useProducts } from "../hooks/useProducts.jsx";


export default function ProductsList() {
    const {products, loading, error} = useProducts();
    if (loading) return <p>Loading...</p>;
    if (error) return <p>error:{error}</p>
    console.log(products);
    return (
        <ul>
            {products.map(product => <li key={product.id}>{product.name}</li>)}
        </ul>
    )

}

