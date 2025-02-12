/* eslint-disable react/prop-types */
import "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const updateCredits = (data) => {
    setCookie("userData", data, {
      expires: new Date(Date.now() + 604800000),
    });
  };

  return (
    <AuthContext.Provider
      value={{ cookies, setCookie, removeCookie, updateCredits }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
