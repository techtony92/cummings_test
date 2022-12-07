const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  entry: ['whatwg-fetch', './src/index.ts'],
  output: {
    clean: true,
    filename: 'main.bundle.js',
    library: {
      name: 'UI',
      type: 'umd',
    },
    path: path.join(__dirname, 'lib'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                namedExport: true,
                localIdentName: '[local]__[hash:base64:8]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset',
      },
      {
        test: /\.(ttf|eot|woff(2)?)(\?v=\d\.\d\.\d)?$/,
        type: 'asset',
      },
    ],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  plugins: [new MiniCssExtractPlugin()],
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
});
