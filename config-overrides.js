const CopyPlugin = require('copy-webpack-plugin');
 
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'osrm', to: 'static' }
      ],
    }),
  ],
};