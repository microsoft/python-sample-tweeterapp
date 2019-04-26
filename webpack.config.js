const webpack = require('webpack');


module.exports = {
  entry: {
    javascript: './frontend/static/frontend/main.js',
    html: './frontend/templates/frontend/react_index.html',
},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["react-hot-loader/webpack", "babel-loader"],
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.html$/,
        loader: "file-loader?name=[name].[ext]",
      },
    ]
  },
};



