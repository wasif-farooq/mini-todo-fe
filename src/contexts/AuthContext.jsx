import React, { createContext, useState, useContext, useEffect } from "react";
import authService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

// Create a context for authentication
const AuthContext = createContext();

/**
 * AuthProvider component that provides authentication-related state and functions.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the authenticated user's information on initial load
    const fetchUser = async () => {
      try {
        const response = await authService.me();
        setUser(response.data.user);
      } catch (err) {
        console.error("Failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  /**
   * Login function.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   */
  const login = async (email, password) => {
    try {
      setLoginError(null); // Reset previous errors
      const response = await authService.login(email, password);
      setUser(response.user);
      navigate("/");
    } catch (err) {
      setLoginError("Login failed");
      console.error("Login failed", err);
    }
  };

  /**
   * Register function.
   * @param {Object} userData - The user registration data.
   * @param {string} userData.email - The user's email.
   * @param {string} userData.password - The user's password.
   * @param {string} userData.name - The user's name.
   */
  const register = async (userData) => {
    try {
      setRegisterError(null); // Reset previous errors
      const response = await authService.register(userData);
      setUser(response.user);
    } catch (err) {
      setRegisterError("Registration failed");
      console.error("Registration failed", err);
    }
  };

  /**
   * Logout function.
   */
  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem("selectedOrganization");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginError,
        registerError,
        login,
        register,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the AuthContext.
 * @returns {Object} - The auth context value.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
