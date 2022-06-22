import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import jwt from "jwt-decode";
import { todoapi } from "../api/todoapi";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const { post } = todoapi();

  useEffect(() => {
    const tokenInStorage = localStorage.getItem("token");
    if (tokenInStorage) {
      setToken(tokenInStorage);
      setUser(jwt(tokenInStorage));
    }
  }, []);

  const auth = () => {
    const googleBaseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const searchParams = new URLSearchParams();
    searchParams.append("response_type", "code");
    searchParams.append(
      "client_id",
      "340871493950-1so39sluambockgukq82nem8jilucdm7.apps.googleusercontent.com"
    );
    searchParams.append("redirect_uri", "http://localhost:3000/callback");
    searchParams.append("scope", "openid");
    searchParams.append("prompt", "select_account");

    const fullUrl = googleBaseUrl + "?" + searchParams.toString();
    //window.open(fullUrl, "_self"); helyett a következő
    window.location.href = fullUrl;
  };

  const login = async (code, provider) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/user/login`,
        {
          code: code,
          provider: provider,
        }
      );
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setUser(jwt(response.data.token));
    } catch (error) {
      console.log(error);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  const logout = () => {
    setToken(null);
  };

  const register = async (username) => {
    const response = post("/user/create", { username });
    if (response?.status === 200) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setUser(jwt(response.data.token));
    }
  };

  const contextValue = { token, auth, login, logout, user, register };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Add auth provider to root");
  return context;
};

export { AuthProvider, useAuth };
