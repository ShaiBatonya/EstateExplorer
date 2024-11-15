import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
import {AuthProvider} from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import theme from "../src/theme/theme.js";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
     <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <CartProvider>
        <ToastContainer />
        <App />
        </CartProvider>
    </AuthProvider>
    </QueryClientProvider>
  </ChakraProvider>
);
