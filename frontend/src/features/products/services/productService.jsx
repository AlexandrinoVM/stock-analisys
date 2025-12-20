import { useState,useEffect } from "react";

export async function GetProducts() {
    const response = await fetch('http://localhost:3000/api/products');
    if(!response.ok) throw new Error('Error fetching products');
    return response.json()

}