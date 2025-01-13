const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ],
  mode: 'production',
  optimization: {
    usedExports: true,
    minimize: true,
  },
}