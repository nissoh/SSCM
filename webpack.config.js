const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  mode: "development",
  watch: false,
  entry: {
    theme: './src/applyTheme.ts',
    main: './src/index.ts',
  },
  context: __dirname, // to automatically find tsconfig.json
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true, // Set to true if you are using fork-ts-checker-webpack-plugin
            projectReferences: true
          }
        }
      }
    ]
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname)
    ],
    extensions: [".ts", '.js'],
    fallback: {
      crypto: false,
    }
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      
    }),
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "assets" },
        { from: "manifest.json" },
        { from: "sw.js" },
      ]
    }),
  ],
  // node: { crypto: true, stream: true },
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '.dist')
  }
}