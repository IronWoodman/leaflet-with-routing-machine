const CopyPlugin = require('copy-webpack-plugin');
 
module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/osrm/kor.osrm', to: 'public' }
      ],
    }),
  ],
};