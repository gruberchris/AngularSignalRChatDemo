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
    path: __dirname
  }
};
