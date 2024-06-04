import ESLintPlugin from "eslint-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import path from "path";

export function buildPlugins({
  mode,
  paths,
  analyzer,
}: BuildOptions): Configuration["plugins"] {
  const isDev = mode === "development";
  const isProd = !isDev;

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      title: "SupportApp",
      template: paths.html,
      favicon: path.resolve(paths.public, "favicon.ico"),
      publicPath: "/",
    }),
  ];

  if (isDev) {
    plugins.push(
      new ESLintPlugin(),
      // new ForkTsCheckerWebpackPlugin(),
      new ReactRefreshWebpackPlugin()
    );
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
