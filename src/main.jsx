import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { CookiesProvider } from "react-cookie";
import "./input.css";
import { Flowbite } from "flowbite-react";

import AuthProvider from "./provider/AuthProvider";
import ApiProvider from "./provider/ApiProvider";

import { Provider } from "react-redux";
import { store } from "./store";

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
