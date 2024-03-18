import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Login from "./pages/public/Login";
import Root from "./pages/Root";
import Dashboard from "./pages/private/Dashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import AddCategory from "./pages/private/categories/AddCategory";
import EditCategory from "./pages/private/categories/EditCategory";
import Categories from "./pages/private/categories/Categories";
import AddProduct from "./pages/private/products/AddProduct";
import Products from "./pages/private/products/Products";
import EditProduct from "./pages/private/products/EditProduct";
import Users from "./pages/private/users/Users";
import Orders from "./pages/private/orders/Orders";
import OrderDetails from "./pages/private/orders/OrderDetails";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route index element={<Login />} />

      <Route element={<PrivateRoutes />}>
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="products">
          <Route index element={<Products />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:product_id" element={<EditProduct />} />
        </Route>

        <Route path="users">
          <Route index element={<Users />} />
        </Route>

        <Route path="categories">
          <Route index element={<Categories />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="edit-category/:category_id" element={<EditCategory />} />
        </Route>

        <Route path="orders">
          <Route index element={<Orders />} />
          <Route path="order-details/:order_id" element={<OrderDetails/>}/>
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
