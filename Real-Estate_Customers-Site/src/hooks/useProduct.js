// src/hooks/useProduct.js
import { useState, useEffect } from "react";
import { fetchProductById } from "../services/productService";

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function getProduct() {
      try {
        setLoading(true);
        const data = await fetchProductById(id, controller.signal);
        setProduct(data);
      } catch (err) {
        // Only set error if it wasn't an aborted request
        if (!controller.signal.aborted) {
          setError(err.response?.data?.error || "An error occurred");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getProduct();

    // Cleanup: abort fetch on unmount
    return () => {
      controller.abort();
    };
  }, [id]);

  return { product, loading, error };
}
