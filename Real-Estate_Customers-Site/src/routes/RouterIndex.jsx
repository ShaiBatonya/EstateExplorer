import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom"; // React Router v6+ for declarative routing
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
} from "./elements"; // Lazy-loaded route components
import Root from "../pages/Root"; // Main layout component
import Product from "../pages/public/products/Product"; // Product details page
import { Suspense, useContext } from "react"; // Core React utilities
import PrivateRoutes from "../utils/PrivateRoutes"; // Wrapper for protected routes
import { AuthContext } from "../context/AuthContext"; // Authentication context
import { getAllProducts } from "../pages/public/products/Home"; // Loader function for products

/**
 * RouterIndex - Central component for routing setup.
 * This component defines public and private routes and configures lazy loading.
 * Uses React Router v6+ with future flags enabled for optimized routing.
 */
const RouterIndex = () => {
  const { user, setUser } = useContext(AuthContext); // Access authentication state

  // Create the router with defined routes and apply future flags for v7
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<NotFound />}>
        {/* Public routes */}
        <Route
          index
          loader={async () => {
            try {
              const products = await getAllProducts(); // Fetch products for the home page
              return { products };
            } catch (error) {
              console.error("Failed to load products", error);
              throw error; // Pass error to Router's errorElement
            }
          }}
          element={<Home />}
        />
        <Route path="product/:id" element={<Product />} />
        <Route
          path="about"
          element={
            <Suspense fallback={<div>Loading About Page...</div>}>
              <About />
            </Suspense>
          }
        />
        <Route path="contact" element={<Contact />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="cart" element={<Cart />} />

        {/* Private routes (requires authentication) */}
        <Route element={<PrivateRoutes user={user} />}>
          <Route path="orders" element={<Orders user={user} />} />
          <Route
            path="profile"
            element={<Profile setUser={setUser} user={user} />}
          />
        </Route>

        {/* Auth-related routes */}
        <Route path="password-reset" element={<PasswordReset />} />
        <Route path="forgot-password/:id" element={<ForgotPassword />} />

        {/* Fallback route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Route>
    ),
    {
      future: {
        v7_startTransition: true, // Use React's startTransition for smoother navigation
        v7_relativeSplatPath: true, // Improve relative path handling for splats
        v7_fetcherPersist: true, // Enable fetcher persistence across navigation
        v7_normalizeFormMethod: true, // Normalize form method to uppercase
        v7_partialHydration: true, // Support partial hydration for better performance
        v7_skipActionErrorRevalidation: true, // Skip revalidation on action errors
      },
    }
  );

  return <RouterProvider router={router} />; // Provide the router context
};

export default RouterIndex; // Export for use in the main App component
