var Path = require('path');
var WebPack = require('webpack');

module.exports = {
  entry: './src/index.js',

  output: {
    libraryTarget: 'commonjs2',
    path: Path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [ 'web_modules', 'node_modules' ]
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: '6to5-loader?experimental'}
    ]
  }
}
