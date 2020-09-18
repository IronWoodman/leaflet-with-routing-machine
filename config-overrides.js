const CopyPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
    // if (!config.plugins) {
    //     config.plugins = [];
    // }

    // config.plugins.push(
    //     (process.env.NODE_ENV === 'production') ?
    //     new CopyWebpackPlugin([{from: 'src/lib/legacyLib.js'}]) :
    //     new CopyWebpackPlugin([{from: 'src/lib/legacyLib.js', to: 'dist'}])
    // );
    config.module.rules.push(
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      }
    );
    
    config.plugins.push(
        new CopyPlugin({
          patterns: [
            { from: 'osrm', to: 'static' },
          ],
          options: {
            concurrency: 100,
          },
        }),
    );

    return config;
}
