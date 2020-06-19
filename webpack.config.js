const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// {}はclean-webpack-pluginクラスだけを読み込むという意味
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // npx webpackコマンドで--mode developmentとしなくてもdevelopmentモードになる。productionがデフォルト。
  mode: "development",
  // source-mapは開発用。本番用の時は外す。ブラウザで表示するのが遅くなるから。
  devtool: "source-map",
  entry: "./src/javascripts/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "javascripts/main.js"
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: "> 0.25%, not dead" }],
                "@babel/preset-react"
              ]
            }
          }
        ]
      },
      {
        test: /\.(css|sass|scss)/,
        use: [
          // loaderは下から上に適応される。重要。
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            // trueでcssの開発が便利になる。ファイルが重くなるので、本番環境ではfalse(OFF)にする
            options: {
              sourceMap: false
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg)/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "images/[name].[ext]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              }
            }
          }
        ]
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true
            }
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
      template: "./src/templates/index.pug",
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/access.pug",
      filename: "access.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/members/taro.pug",
      filename: "members/taro.html"
    }),
    new CleanWebpackPlugin()
  ]
};
