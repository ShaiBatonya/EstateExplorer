// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import theme from "./theme/theme.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10 minutes
      cacheTime: 900000, // 15 minutes
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

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
