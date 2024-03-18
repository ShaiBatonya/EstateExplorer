// Import necessary dependencies
import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axiosInstance from "../config/axiosConfig"; // Import the axios instance

// Create an authentication context
export const AuthContext = createContext();

// Authentication provider component
export function AuthProvider({ children }) {
  // State variables for user, cookies, loading, and error
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["customer_token"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login function
  const login = async (user_email, user_password) => {
    try {
      const { data } = await axiosInstance.post("/users/customers/login", {
        user_email,
        user_password
      });

      setCookie("customer_token", data.customer_token, { path: "/", maxAge: 10800 });
      
      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };

  // Check user authentication on component mount
  useEffect(() => {
    const authUser = async () => {
      if (cookies.customer_token) {
        setLoading(true);
        try {
          const { data } = await axiosInstance.get("/users/customers/auth", {
            headers: {
              Authorization: `Bearer ${cookies.customer_token}`
            }
          });

          setUser(data.user);
          
        } catch (error) {
          removeCookie("customer_token");
          setUser(null);
          setError(error.response.data.error);
        } finally {
          setLoading(false);
        }
      }
    };

    authUser();
  }, [cookies, removeCookie]);

  // Save user to local storage on user state change
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Logout function
  const logout = async () => {
    try {
      await axiosInstance.post("/users/customers/logout", {}, {
        headers: {
          Authorization: `Bearer ${cookies.customer_token}`
        }
      });

      removeCookie("customer_token");
      setUser(null);
      
      return {
        success: true,
        message: "Logout successful"
      };
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };

  // Register function
  const register = async (values) => {
    try {
      const { user_name, user_email, user_password, user_phone } = values;
  
      const response = await axiosInstance.post("/users/customers/register", {
        user_name,
        user_email,
        user_password,
        user_phone: user_phone || ""
      });
  
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
  
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      throw new Error(error.response.data.error || "Error in registering user");
    }
  };

  // Forgot password function
  const forgot = async (user_email) => {
    try {
      const response = await axiosInstance.post("/emails/send-password-link", {
        user_email
      });
  
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      throw new Error(error.response.data.error || "Error in registering user");
    }
  };

  // Authentication context value
  const value = {
    user,
    setUser,
    login,
    logout,
    register,
    forgot,
    loading,
    error
  };

  // Provide the authentication context to its children components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
