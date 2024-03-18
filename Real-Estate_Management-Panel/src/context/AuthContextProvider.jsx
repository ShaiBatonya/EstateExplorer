import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [manager, setManager] = useState(cookies.token ? true : false);

  const valueToShare = {
    manager,
    setManager,
  };

  useEffect(() => {
    const authManager = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/users/managers/auth`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );

        data.manager;
        setCookie("token", data.token, { path: "/", maxAge: 10800 });
      } catch (error) {
        removeCookie("token");
        setManager(null);
        console.log(error);
      }
    };

    if (cookies.token) {
      authManager();
    }
  }, []);

  return (
    <AuthContext.Provider value={valueToShare}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
