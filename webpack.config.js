const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // Components for '/config' route
    config: path.join(__dirname, 'client/src/config.js'),
  },
  output: {
    path: path.join(__dirname, 'client/public/bundles'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'client/src'),
        exclude: /node_modules/,
        query: {
          presets: [
            'react',
            ['env', {
              "modules": false,
              "targets": {
                "browsers": ["last 2 Chrome versions"]
              }
            }]
          ],
          'plugins': [],
        }
      }
    ]
  },
};
