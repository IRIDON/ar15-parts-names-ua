const config = require('./webpack.config.js');
const webpack = require("webpack");


module.exports = Object.assign(config, {
    mode: 'production',
});
