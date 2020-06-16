const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// {}はclean-webpack-pluginクラスだけを読み込むという意味
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/javascripts/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "javascripts/main.js"
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          // loaderは下から上に適応される。重要。
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./stylesheets/main.css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.html"
    }),
    new CleanWebpackPlugin()
  ]
};
