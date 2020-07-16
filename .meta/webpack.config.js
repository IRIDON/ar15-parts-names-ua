const path = require('path');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const root = path.resolve(__dirname, '..');

const dataNames = require('../source/names.json')

dataNames.sort(function(a, b) {
  return a.sort - b.sort;
});

module.exports = {
  mode: 'production',
  entry: '../assets/index.js', 
  output: {
    path: path.resolve(root, 'dist'), 
    filename: 'bundle.js',
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(html)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
          })
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'app')
    ],
    extensions: ['.js', '.json', '.jsx', '.css']
  },
  plugins: [
    new HandlebarsPlugin({
      entry: path.join(root, 'assets', '*.hbs'),
      output: path.join(root, 'dist', '[name].html'),
      data: dataNames,
    }),
    new ExtractTextPlugin('styles.css'),
  ],
  context: __dirname, 
  target: 'web',
}