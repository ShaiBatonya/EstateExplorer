import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { useCookies } from "react-cookie";
import axios from "axios";

function PrivateRoutes() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const { manager } = useContext(AuthContext);

  if (!manager) {
    return <Navigate to="/" />;
  }

  // add to every request from now on
  axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.token}`;

  return <Outlet />;
}

export default PrivateRoutes;
