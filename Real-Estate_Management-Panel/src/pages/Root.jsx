import { Outlet } from "react-router-dom";
import { useContext } from "react";
import Nav from "../components/sections/Nav";
import { AuthContext } from "../context/AuthContextProvider";

function Root() {
  const { manager } = useContext(AuthContext);

  return (
    <>
      {manager && <Nav />}
      <Outlet />
    </>
  );
}

export default Root;
