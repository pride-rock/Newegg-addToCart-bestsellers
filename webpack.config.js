
    
const webpack = require('webpack');
const path = require('path');
var CompressionPlugin = require('compression-webpack-plugin');

const config = {
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  },
  plugins: [
    new CompressionPlugin()
  ]
}

module.exports = config;


// const webpack = require('webpack');
// const path = require('path');
// var CompressionPlugin = require('compression-webpack-plugin');

// var SRC_DIR = path.join(__dirname, '/client/src');
// var DIST_DIR = path.join(__dirname, '/client/dist');



// const config = {
//   entry: `${SRC_DIR}/index.jsx`,
//   output: {
//     filename: 'bundle.js',
//     path: DIST_DIR
//   },
//   module: {
//     rules: [
//       {
//         include : SRC_DIR,
//         test: /\.(js|jsx)$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/
//       }
//     ]
//   },
//   resolve: {
//     extensions: [
//       '.js',
//       '.jsx'
//     ]
//   },
//   plugins: [
//     new CompressionPlugin()
//   ]
// }

// module.exports = config;