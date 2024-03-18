// Import necessary components and functions
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import axiosInstance from "../config/axiosConfig"; // Import the axios instance

// Component to handle private routes
function PrivateRoutes({ user }) {
  // Use the react-cookie hook to get the "customer_token" cookie
  const [cookies] = useCookies(["customer_token"]);

  // If there is no authenticated user and no "customer_token" cookie, navigate to the home page
  if (!user && !cookies.customer_token) {
    return <Navigate to="/" />;
  }

  // Set the Authorization header for axios using the "customer_token" cookie
  axiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${cookies.customer_token}`;

  // Render the nested routes within the Outlet component
  return <Outlet />;
}

export default PrivateRoutes; // Export the PrivateRoutes component as the default export
