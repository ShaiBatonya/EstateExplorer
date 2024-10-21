import { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    if (!user) {
      alert("Please log in to add products to the cart.");
      return;
    }
    setCartItems((prevItems) => [...prevItems, product]);
    alert("Product added to cart!");
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  };

  const value = { cartItems, addToCart, removeFromCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
