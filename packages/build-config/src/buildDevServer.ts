import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export interface EnvVariables {
  SUPPORT_API_URL: string;
}

export function buildDevServer(
  env: EnvVariables,
  { port }: BuildOptions
): DevServerConfiguration {
  const SUPPORT_API_URL = env.SUPPORT_API_URL ?? "http://localhost:5080";

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
        target: SUPPORT_API_URL,
        pathRewrite: { "^/api": "" },
        secure: false,
      },
    },
  };
}
