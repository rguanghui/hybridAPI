const webpack = require('webpack')

module.exports = {
  entry: './src/',
  output: {
    library: 'hybridAPI',
    libraryTarget: 'umd',
    filename: 'hybrid-api.js',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loaders: 'buble-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
}
