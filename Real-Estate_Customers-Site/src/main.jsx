import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
import {AuthProvider} from "./context/AuthContext";
import "./index.css";
import theme from "../src/theme/theme.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <AuthProvider>
    
        <ToastContainer />
        <App />
    
    </AuthProvider>
  </ChakraProvider>
);
