import { App } from "@/components/App";
import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { AboutLazy } from "@/pages/about/About.Lazy";

const routes = [
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: "/admin/about",
        element: (
          <Suspense fallback="...Loading">
            <AboutLazy />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
