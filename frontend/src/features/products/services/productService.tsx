import { useState,useEffect } from "react";

export async function GetProducts():Promise<Product[]> {
    const response = await fetch('http://localhost:3000/api/products');
    if(!response.ok) throw new Error('Error fetching products');
    const data =  await response.json() as Product[];
    return data; 
}