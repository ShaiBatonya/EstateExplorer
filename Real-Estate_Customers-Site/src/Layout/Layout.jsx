
import { Outlet } from "react-router-dom";
import Nav from "./sections/Nav";
import Footer from "./sections/Footer";

const Layout = () => {
  return (
    <>
      <div>
        <Nav />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
