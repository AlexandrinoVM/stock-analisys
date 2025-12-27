import api from '../../../../api/api';

export async function CreateProducts({productData}:any){ 
    try {
        const response = await api.post('/products', productData);
        return {success: true, data: response.data};
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}