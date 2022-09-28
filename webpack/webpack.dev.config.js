const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

module.exports = (async function () {
  const common = await require('./webpack.common.config');

  return merge(common, {
    mode: 'development',

    plugins: [
      new webpack.SourceMapDevToolPlugin({
        test: /\.(ts|js|css)($|\?)/i,
      }),
    ],
  });
})();
