const pkg = require('./package.json')
const path = require('path')
const webpack = require('webpack')

const banner = `in-eu v${pkg.version}`

module.exports = {
  entry: './index.js',
  output: {
    filename: 'in-eu.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'InEU',
    libraryTarget: 'umd'
  },
  mode: 'production',
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
  }
}
