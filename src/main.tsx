import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider } from "react-router";

import { App } from "@/app/app";
import "@/app/globals.css";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    // Single-page site: send unknown paths home instead of the router's dev error screen.
    path: "*",
    loader: () => redirect("/"),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
