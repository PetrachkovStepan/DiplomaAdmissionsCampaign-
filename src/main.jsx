import { StrictMode } from "react";

import { Provider } from "react-redux";
import { Flowbite } from "flowbite-react";
import { CookiesProvider } from "react-cookie";

import store from "@/store/index";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import ApiProvider from "./provider/ApiProvider";
import AuthProvider from "./provider/AuthProvider";

import "./input.css";

const mainTheme = {
  button: {
    borderRadius: {
      primary: "rounded-none",
    },
  },
};

const router = createRouter({ routeTree });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <AuthProvider>
          <ApiProvider>
            <Flowbite theme={{ theme: mainTheme }}>
              <RouterProvider router={router} />
            </Flowbite>
          </ApiProvider>
        </AuthProvider>
      </CookiesProvider>
    </Provider>
  </StrictMode>
);
