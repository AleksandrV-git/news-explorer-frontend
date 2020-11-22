// webpack.config.js
const path = require('path');
// подключаем path к конфигу вебпак

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Подключили к проекту плагин

const HtmlWebpackPlugin = require('html-webpack-plugin');

const WebpackMd5Hash = require('webpack-md5-hash');

const webpack = require('webpack');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// подключаем плагин
const isDev = process.env.NODE_ENV === 'development';
// создаем переменную для development-сборки

module.exports = {
    devServer: {
    index: '/main.html'
    },
    entry: { main: './src/script.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{ // тут описываются правила
            test: /\.js$/, // регулярное выражение, которое ищет все js файлы
            use: { loader: 'babel-loader' }, // весь JS обрабатывается пакетом babel-loader
            exclude: /node_modules/ // исключает папку node_modules
        },
        {
            test: /\.css$/, // применять это правило только к CSS-файлам
            use: [
                (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                },
                'postcss-loader'
            ] // к этим файлам нужно применить пакеты, которые мы уже установили // добавили минификацию CSS
            // в правилах укажите, что если вы собираете в режиме dev, то плагин MiniCssExtractPlugin загружать не нужно.
        },
        {
            test: /\.(png|jpg|gif|ico|svg)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: './images/[name].[ext]',
                        esModule: false,
                    }
                }, // указали папку, куда складывать изображения
                {
                    loader: 'image-webpack-loader',
                    options: {}
                },
            ]
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./vendor/[name].[ext]'
        }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'style.[contenthash].css' }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            // Означает, что:
            inject: false, // стили НЕ нужно прописывать внутри тегов
            // hash: true, // для страницы нужно считать хеш
            template: './src/pages/main.html', // откуда брать образец для сравнения с текущим видом проекта
            filename: 'main.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
          }),
        new HtmlWebpackPlugin({
            // Означает, что:
            inject: false, // стили НЕ нужно прописывать внутри тегов
            // hash: true, // для страницы нужно считать хеш
            template: './src/pages/saved-articles.html',
            filename: 'saved-articles.html',
          }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]

}
// переписали точку выхода, используя утилиту path
