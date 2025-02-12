import { useLocation, useNavigate } from "@tanstack/react-router";
import "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useAuth } from "./authProvider";

const ShortLinkContext = createContext(null);

export function ShortLinkProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { removeCookie } = useAuth();

  useEffect(() => {
    if (location.search.reg && location.search.org) {
      navigate({ to: "/", search: {org: location.search.org} });
      removeCookie("userData");
    }
  }, [location]);

  return (
    <ShortLinkContext.Provider value={{ location, navigate }}>
      {children}
    </ShortLinkContext.Provider>
  );
}

export function useShortNav() {
  const context = useContext(ShortLinkContext);
  if (!context) {
    throw new Error("useShortNav must be used within an ShortLinkProvider");
  }
  return context;
}
