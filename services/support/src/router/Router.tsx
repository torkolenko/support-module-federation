import { App } from "@/App";
import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { MainLazy } from "@/pages/main/Main.Lazy";
import { Page404Lazy } from "@/pages/404/Page404.Lazy";

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
      {
        path: "*",
        element: (
          <Suspense fallback="...Loading">
            <Page404Lazy />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
