import { Suspense, lazy } from "react";
import { Spinner } from "@chakra-ui/react";

const Loadable = (Component) => (props) => (
  <Suspense fallback={<Spinner size="xl" color="teal.500" />}>
    <Component {...props} />
  </Suspense>
);

export const About = Loadable(lazy(() => import("../pages/public/About")));
export const Contact = Loadable(lazy(() => import("../pages/public/Contact")));
export const ForgotPassword = Loadable(lazy(() => import("../pages/public/ForgotPassword")));
export const Home = Loadable(lazy(() => import("../pages/public/products/Home")));
export const Login = Loadable(lazy(() => import("../pages/public/Login")));
export const NotFound = Loadable(lazy(() => import("../pages/public/NotFound")));
export const Orders = Loadable(lazy(() => import("../pages/private/Orders")));
export const PasswordReset = Loadable(lazy(() => import("../pages/public/PasswordReset")));
export const Product = Loadable(lazy(() => import("../pages/public/products/Product")));
export const Profile = Loadable(lazy(() => import("../pages/private/Profile")));
export const Register = Loadable(lazy(() => import("../pages/public/Register")));
export const Cart = Loadable(lazy(() => import("../pages/public/Cart")));
