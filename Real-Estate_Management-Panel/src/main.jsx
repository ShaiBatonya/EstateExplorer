import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ChakraProvider>
      <ToastContainer />
      <App />
    </ChakraProvider>
  </AuthContextProvider>
);
