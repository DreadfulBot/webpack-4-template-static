/* eslint-disable no-console */
/**
 * Created by RiskyWorks on 05.02.2018.
 */
const base = require('./webpack.base.config.babel');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(base, {
	plugins: [
		new UglifyJsPlugin(),
	],
});

