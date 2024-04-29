const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack'); // Import webpack

module.exports = override(
  addWebpackAlias({
    'stream': require.resolve('stream-browserify'),
    'os': require.resolve('os-browserify/browser'),
    'path': require.resolve('path-browserify'),
    'crypto': require.resolve('crypto-browserify'),
    'vm': require.resolve('vm-browserify'),
  }),
  // Define process.env for the browser
  addWebpackPlugin(
    new webpack.ProvidePlugin({
        process: 'process/browser', // Polyfill for the process module
        Buffer: ['buffer', 'Buffer'], // Polyfill for Buffer globally
    })
),
);
