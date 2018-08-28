'use strict';
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = [{
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },{
      test: /\.html$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader'
      }, {
        loader: '@vanilla-ftw/vanilla-dom-loader'
      }]
    }, {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader'
        },
        //{
          //loader: MiniCssExtractPlugin.loader
        //}, 
        {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: { 
            plugins: [
              require('cssnano')({
                preset: 'advanced'
              }),
              require('autoprefixer')()
            ]
          }
        }, {
          loader: 'sass-loader'
        }
      ]
    }]
  },
  entry: {
    main: './src/vanilla-modal.js',
  },
  output: {
    path: __dirname,
    filename: 'vanilla-modal.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "vanilla-modal.css"
    })
  ]
}];
