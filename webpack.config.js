const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const isDevelop = (process.env.NODE_ENV === "development");

module.exports = {
  entry: "./src/app/entry/entry.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    filename: "build.js"
  },
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm.js",
      "@": path.resolve(process.cwd(), "src/app")
    },
    extensions: [".json", ".ts", "tsx", ".js", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: "pre",
        loader: "eslint-loader"
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          "css-loader"
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.sass$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "sass-loader?indentedSyntax"
        ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            "scss": [
              "vue-style-loader",
              "css-loader",
              "sass-loader"
            ],
            "sass": [
              "vue-style-loader",
              "css-loader",
              "sass-loader?indentedSyntax"
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  devServer: {
    contentBase: "dist",
    historyApiFallback: false,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: (isDevelop) ? "eval-source-map" : "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/app/templates/index.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "404.html",
      template: path.resolve(__dirname, "./src/app/templates/404.html"),
    }),
    ...(isDevelop) ? [
      new ProgressBarPlugin()
    ] : [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: "\"production\""
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ]
  ]
};
