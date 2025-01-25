// src/services/productService.js
import axiosInstance from "../config/axiosConfig";

export async function fetchProductById(id, signal) {
  const { data } = await axiosInstance.get(
    `${import.meta.env.VITE_SERVER_URL}/products/customers/product/${id}`,
    { signal } // Pass the AbortController signal here
  );
  return data.product;
}
