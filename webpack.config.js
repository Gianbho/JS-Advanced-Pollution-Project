const HtmlWebpackPlugin = require("html-webpack-plugin")
const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = (env, argv) => {
  const entryPath = argv.mode === 'development' ? './src/index_dev.js' : './src/index.js'
  return {
    entry: {
      main: path.resolve(__dirname, entryPath),
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'build'),
      sourceMapFilename: "[name].js.map"
    },
    devtool: "source-map",
    devServer: {
      contentBase: './build',
      open: true
    },
    module: {
  rules: [
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },
    {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
    }
  ],
},
    plugins: [
      new HtmlWebpackPlugin({
        title: "Pollution Forecast Project GT",
        template: path.resolve(__dirname, './src/index.html'),
      }),
      new Dotenv()
    ]
  }
};
