import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";

export function buildLoaders({ mode }: BuildOptions): ModuleOptions["rules"] {
  const isDev = mode === "development";

  const tsLoader = {
    test: /\.tsx?$/,
    use: {
      loader: "ts-loader",
      options: {
        transpileOnly: isDev,
        getCustomTransformers: () => ({
          before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
        }),
      },
    },
    exclude: /node_modules/,
  };

  const cssLoaders = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
          },
          importLoaders: 2,
        },
      },
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: ["postcss-preset-env"],
          },
        },
      },
      {
        loader: "sass-loader",
        options: {
          warnRuleAsWarning: true,
        },
      },
    ],
  };

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const svgLoader = {
    test: /\.svg$/i,
    use: [{ loader: "@svgr/webpack", options: { icon: true } }],
  };

  return [tsLoader, cssLoaders, assetsLoader, svgLoader];
}
