import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildDevServer({ port }: BuildOptions): DevServerConfiguration {
  return {
    historyApiFallback: true,
    hot: true,
    client: {
      logging: "warn",
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
      reconnect: 5,
    },
    compress: true,
    port: port ?? 4200,
    open: true,
    proxy: {
      "/api": {
        context: ["/api"],
        target: "http://localhost:5080",
        pathRewrite: { "^/api": "" },
        secure: false,
      },
    },
  };
}
