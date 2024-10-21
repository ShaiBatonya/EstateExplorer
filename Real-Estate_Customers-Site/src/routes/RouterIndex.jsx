// Import necessary components and functions from libraries and files
import {
  Home,
  Login,
  Register,
  About,
  Contact,
  Orders,
  Profile,
  PasswordReset,
  NotFound,
  ForgotPassword,
  Cart,
} from "./elements"; // Import components from the "elements" module
import Root from "../pages/Root"; // Import the Root component
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom"; // Import routing-related components and functions
import Product from "../pages/public/products/Product"; // Import the Product component
import { Suspense, lazy, useContext } from "react"; // Import necessary React components and functions
import PrivateRoutes from "../utils/PrivateRoutes"; // Import the PrivateRoutes component
import { AuthContext } from "../context/AuthContext"; // Import the AuthContext for authentication
import { getAllProducts } from "../pages/public/products/Home"; // Import a function to get all products

// Component to handle public routes
const RouterIndex = () => {
  const { user, setUser } = useContext(AuthContext); // Get user information and setUser function from AuthContext
  const router = createBrowserRouter(
    createRoutesFromElements(
      // Create routes using elements from the "elements" module
      <Route path="/" element={<Root />}>
        {/* Home route with dynamic loading of products */}
        <Route index loader={getAllProducts} element={<Home />} />
        {/* Product route with dynamic loading */}
        <Route path="product/:id" element={<Product />} />
        {/* About route with lazy loading for better performance */}
        <Route
          path="about"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <About />
            </Suspense>
          }
        />
        {/* Contact route */}
        <Route path="contact" element={<Contact />} />
        {/* Register and Login routes */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        {/* Cart route */}
        <Route path="cart" element={<Cart />} />

        {/* Private routes available only for authenticated users */}
        <Route element={<PrivateRoutes user={user} />}>
          {/* Orders route */}
          <Route path="orders" element={<Orders user={user} />} />
          {/* Profile route */}
          <Route
            path="profile"
            element={<Profile setUser={setUser} user={user} />}
          />
        </Route>

        {/* Password reset route */}
        <Route path="password-reset" element={<PasswordReset />} />
        {/* Forgot password route */}
        <Route
          path="forgot-password/:id"
          element={<ForgotPassword user={user} />}
        />
        {/* Default route for not found pages */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />; // Return the RouterProvider with the created router
};

export default RouterIndex; // Export the RouterIndex component as the default export