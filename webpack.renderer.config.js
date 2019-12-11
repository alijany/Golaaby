const rules = require('./webpack.rules');
const webpack = require('webpack');
const babelConfig = require('./babel.config.js');

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

rules.push({
  test: /\.css|.scss$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
});

rules.push({
  test: /\.(js|jsx)$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: babelConfig
  }
})

rules.push({
  test: /\.(woff|woff2|ttf|otf)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        // outputPath: '/assets/fonts',
        name: '[name].[ext]'
      }
    },
  ],
})

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets'),
        to: path.resolve(__dirname, '.webpack/renderer')
      }
    ]),
    new webpack.ProvidePlugin({
      // "$": 'jquery',
      'React': 'react'
    })
  ],
};
