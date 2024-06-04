import { App } from "@/components/App";
import { createBrowserRouter } from "react-router-dom";
// @ts-ignore
import supportRoutes from "support/Router";
// @ts-ignore
import adminRoutes from "admin/Router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [...supportRoutes, ...adminRoutes],
  },
]);
