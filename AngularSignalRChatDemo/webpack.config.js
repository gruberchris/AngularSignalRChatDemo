var webpack = require("webpack");

var debug = process.env.NODE_ENV !== "production";

module.exports = {
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "eslint-loader"
    }],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ["ng-annotate", "babel-loader?presets[]=es2015"]
    }]
  },
  output: {
    path: __dirname,
    // Include comments with information about the modules. Do not use in "production".
    pathinfo: debug
  },
  debug: debug,
  devtool: debug ? "#inline-source-map" : null,
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ]
};
