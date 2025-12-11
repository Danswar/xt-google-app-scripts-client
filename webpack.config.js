const path = require('path');

module.exports = {
  entry: './lib/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'xt-open-api.js',
    library: {
      name: 'XtOpenApi',
      type: 'umd'
    },
    globalObject: 'this'
  },
  externals: {
    'UrlFetchApp': 'UrlFetchApp',
    'Logger': 'Logger'
  },
  target: 'web',
  resolve: {
    extensions: ['.js'],
    fallback: {
      'crypto': false
    }
  }
};

