import React, { Suspense, useContext, useCallback } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { AuthContext } from "../context/AuthContext";
import PrivateRoutes from "../utils/PrivateRoutes";

import { 
  Home, Login, Register, About, Contact, 
  Orders, Profile, PasswordReset, NotFound, 
  ForgotPassword, Cart 
} from "./elements";

import Root from "../pages/Root";
import Product from "../pages/public/products/ProductDetails";

// HydrateFallback Component for Suspense
const HydrateFallback = () => <div>Loading content...</div>;

// Custom ErrorFallback Component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert" style={{ color: "red", padding: "20px" }}>
    <h2>Something went wrong:</h2>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary} style={{ marginTop: "10px" }}>
      Try again
    </button>
  </div>
);

const RouterIndex = () => {
  const { user, setUser } = useContext(AuthContext);

  // Memoize router definition for better performance
  const createRouter = useCallback(() => {
    return createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Root />} errorElement={<NotFound />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<Product />} />
          <Route
            path="about"
            element={
              <Suspense fallback={<HydrateFallback />}>
                <About />
              </Suspense>
            }
          />
          <Route path="contact" element={<Contact />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />

          {/* Private routes */}
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

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      ),
      {
        future: {
          v7_startTransition: true,
          v7_relativeSplatPath: true,
          v7_fetcherPersist: true,
          v7_normalizeFormMethod: true,
          v7_partialHydration: true,
          v7_skipActionErrorRevalidation: true,
        },
      }
    );
  }, [user, setUser]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RouterProvider router={createRouter()} />
    </ErrorBoundary>
  );
};

export default React.memo(RouterIndex);
