
import { Outlet } from "react-router-dom";
import Nav from "../components/UI/sections/Navbar/Nav";
import Footer from "../components/UI/sections/Footer";

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
