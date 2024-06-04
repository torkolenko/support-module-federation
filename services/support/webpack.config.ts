import webpack from "webpack";
import { BuildMode, BuildPaths, buildWebpack } from "@packages/build-config";
import path from "path";
import packageJson from "./package.json";

interface EnvVariables {
  mode: BuildMode;
  port: number;
  analyzer?: boolean;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
    public: path.resolve(__dirname, "public"),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 4201,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer,
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: "support",
      filename: "remoteEntry.js",
      exposes: {
        "./Router": "./src/router/Router.tsx",
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies["react"],
        },
        "react-router-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-router-dom"],
        },
        "react-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        },
      },
    })
  );

  return config;
};
