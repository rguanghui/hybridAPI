module.exports = {
  entry: './src/',
  output: {
    libraryTarget: 'umd',
    filename: 'hybrid-api.js'
  },
  module: {
    rules: [
      { test: /.js$/, loaders: 'buble-loader' }
    ]
  } 
}
