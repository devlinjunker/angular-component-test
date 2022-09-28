const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const dynamicImport = require('tsimportlib').dynamicImport;
const AngularWebpackPlugin = require('@ngtools/webpack').AngularWebpackPlugin;

module.exports = (async function () {
  const linkerPlugin = await dynamicImport('@angular/compiler-cli/linker/babel', module);
  console.log(linkerPlugin)
  return {
    devtool: false,

    entry: {
      main: path.resolve(path.join('./app', 'app-bootstrap.ts')),
    },

    output: {
      path: path.resolve(path.join('./dist')),
      filename: '[name].[chunkhash].js',
      assetModuleFilename: 'assets/[hash][ext]',
    },

    resolve: {
      extensions: ['.ts', '.js', '.json'],

      // Enable imports without relative paths.
      // https://moduscreate.com/es6-es2015-import-no-relative-path-webpack/
      modules: [
        path.resolve('./app'),
        path.resolve('./node_modules'),
      ],
    },

    module: {
      rules: [
        

        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          use: ['@ngtools/webpack'],
        },

        // For HTML templates.
        {
          test: /\.html$/,
          include: path.resolve('./app'),
          loader: 'html-loader',
          options: {
            sources: false,
          },
        },

        // Globalize tries to detect different environments by what loader is available.
        // If AMD loader is available, it acts as if it's in a Node environment and loads incorrect modules.
        // This disables the AMD loader for Globalize (which makes it load cldrjs).
        {
          test: /node_modules\/globalize/,
          loader: 'imports-loader',
        },

       

        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]',
          },
        },

        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        },

        // For fonts.
        {
          test: /\.(svg|jpe?g|png|gif)$/,
          type: 'asset/resource',
        },

        {
          test: /node_modules\/.*\.m?js$/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [linkerPlugin.default],
              compact: false,
              cacheDirectory: true,
            },
          },
        },
      ],
    },

    plugins: [
      new AngularWebpackPlugin({
        tsConfigPath: './tsconfig.json',
        entryModule: path.resolve('app/app.module#AppModule'),
        mainPath: './app/app-bootstrap.ts',
        emitClassMetadata: true
      }),

      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      }),

      new HtmlWebpackPlugin({
        template: 'index.ejs',
        inject: 'head',
      }),
    ],
  };
})();
