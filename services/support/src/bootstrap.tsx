import { createRoot } from "react-dom/client";
import { router } from "./router/Router";
import { RouterProvider } from "react-router-dom";
import "./reset.scss";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);

container.render(<RouterProvider router={router} />);
