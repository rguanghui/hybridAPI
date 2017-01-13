module.exports = {
  entry: './src/',
  output: {
    library: 'hybridAPI',
    libraryTarget: 'umd',
    filename: 'hybrid-api.js'
  },
  module: {
    rules: [
      { test: /.js$/, loaders: 'buble-loader' }
    ]
  }
}
