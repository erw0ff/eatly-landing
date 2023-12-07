// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path")
const env = require("./utils/env/environment")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const MiniCssExtractWebpackPlugin = require("mini-css-extract-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin")
const MultipleHtmlWebpackPlugin = require("./utils/plugins/multiple-html.plugin")

const sourcepath = (...args) => path.join(env.get("source"), ...args)
const outputpath = (...args) => path.join(env.get("output"), ...args)

module.exports = {
  entry: "./src/index.js",
  output: {
    path: outputpath(),
    filename: "[name].[chunkhash].js",
    clean: true,
  },
  mode: env.get("mode"),
  devtool: env.get("devtool"),
  devServer: {
    liveReload: true,
    hot: true,
    watchFiles: ["src/**/*"],
    open: false,
    compress: true,
    port: 3000,
    host: "localhost",
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@components": sourcepath("components"),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({ test: /\.js(\?.*)?$/i }),
      new CssMinimizerWebpackPlugin(),
      new ImageMinimizerWebpackPlugin({
        minimizer: {
          implementation: ImageMinimizerWebpackPlugin.imageminMinify,
          options: {
            plugins: [
              "imagemin-gifsicle",
              "imagemin-mozjpeg",
              "imagemin-pngquant",
              "imagemin-svgo",
            ],
          },
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: sourcepath("index.html"),
      filename: "index.html",
      favicon: sourcepath("favicon.ico"),
      templateParameters: {
        title: env.get("htmlDocumentTitle"),
      },
    }),
    ...new MultipleHtmlWebpackPlugin({
      folder: "components",
    }),
    new MiniCssExtractWebpackPlugin({
      filename: "[name].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: sourcepath("assets"),
          to: outputpath("assets"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          { loader: "css-loader", options: { url: false } },
          "sass-loader",
        ],
      },
    ],
  },
}
