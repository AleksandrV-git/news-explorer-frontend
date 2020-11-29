// webpack.config.js
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const WebpackMd5Hash = require('webpack-md5-hash');

const webpack = require('webpack');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
// создаем переменную для development-сборки

module.exports = {
  devServer: {
    index: '/index.html',
  },
  entry: { main: './src/pages/main.js', savedArticles: './src/pages/saved-articles.js' },
  output: {
    path: path.resolve(__dirname, 'dist'), // переписали точку выхода, используя утилиту path
    filename: 'js-bundles/[name].[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: { loader: 'babel-loader' }, // весь JS обрабатывается пакетом babel-loader
      exclude: /node_modules/, // исключает папку node_modules
    },
    {
      test: /\.css$/,
      use: [
        (isDev ? 'style-loader' : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          },
        }),
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        },
        'postcss-loader',
      ], // добавили минификацию CSS
      // если вы собираете в режиме dev, то плагин MiniCssExtractPlugin загружать не нужно.
    },
    {
      test: /\.(png|jpg|gif|ico|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: './images/[name].[ext]',
            esModule: false,
          },
        },
        {
          loader: 'image-webpack-loader',
          options: {},
        },
      ],
    },
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader?name=./vendor/[name].[ext]',
    },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // hash: true, // для страницы нужно считать хеш
      inject: false,
      chunks: ['main'],
      template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),
    new HtmlWebpackPlugin({
      // hash: true,
      inject: false,
      chunks: ['savedArticles'],
      template: './src/saved-articles.html',
      filename: 'saved-articles.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css-bundles/[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),

    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],

};
