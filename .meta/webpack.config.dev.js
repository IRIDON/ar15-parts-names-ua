const config = require('./webpack.config.js');
const webpack = require("webpack");
const path = require('path');


module.exports = Object.assign(config, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
    },
});
