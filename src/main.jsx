import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useAuth } from "./provider/authProvider";
import { QueryProvider } from "./provider/queryProvider";
import { CookiesProvider } from "react-cookie";
import "./input.css";
import { Flowbite } from "flowbite-react";
import { ShortLinkProvider } from "./provider/shortLinkProvider";

const mainTheme = {
  button: {
    borderRadius: {
      primary: "rounded-none",
    },
  },
};

const router = createRouter({ routeTree });

function AppRouterProvider() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <QueryProvider>
        <AuthProvider>
            <Flowbite theme={{ theme: mainTheme }}>
              <AppRouterProvider/>
            </Flowbite>
        </AuthProvider>
      </QueryProvider>
    </CookiesProvider>
  </StrictMode>
);
