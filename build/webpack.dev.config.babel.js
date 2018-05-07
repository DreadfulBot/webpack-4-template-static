/* eslint-disable no-console */
/**
 * Created by RiskyWorks on 05.02.2018.
 */
import {getLocalIpAddress} from './utils'
const base = require('./webpack.base.config.babel');
const merge = require('webpack-merge');

module.exports = merge(base, {

	watch: true,
	watchOptions: {
		aggregateTimeout: 100
	},

	devServer: {
		host: getLocalIpAddress(),
		port: 8081,
	},

	devtool: 'cheap-inline-module-source-map',
});

