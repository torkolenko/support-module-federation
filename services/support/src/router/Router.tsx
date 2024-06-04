import { App } from "@/App";
import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { MainLazy } from "@/pages/main/Main.Lazy";

const routes = [
  {
    path: "/support",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback="...Loading">
            <MainLazy />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
