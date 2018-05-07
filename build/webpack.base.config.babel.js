/* eslint-disable no-console */
/**
 * Created by RiskyWorks on 05.02.2018.
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const poststylus = require('poststylus');
const autoprefixer = require('autoprefixer');

import {paths} from './path'
import {getNodeEnv, getLocalIpAddress, isDev} from './utils'

module.exports = {
	context: path.resolve(path.join(__dirname + '/..')),

	entry: {
		index: path.resolve(path.join(paths.pages, '/index/index.js')),
	},

	output: {
		path: path.join(__dirname, '../' + paths.build),
		filename: '[name].bundle.js'
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				}
			}
		}
	},

	plugins: [
		require('autoprefixer'),
		new webpack.DefinePlugin({
			NODE_ENV:   getNodeEnv(),
			LANG:       JSON.stringify('ru'),
			isDev: isDev(),
			localIpAddress: getLocalIpAddress()
		}),
		new CleanWebpackPlugin(
			path.join('../' + paths.buildRoot), {
				verbose: true
			}),
		new ExtractTextPlugin({
			filename: path.join(paths.buildStyles, '[name].css')
		}),
		new webpack.NoEmitOnErrorsPlugin(),

		new HtmlWebpackPlugin({
			chunks: ['index', 'commons'],
			template: paths.pages + '/index/index.pug',
			filename: 'index.html'
		}),
		new webpack.ProvidePlugin({
			$: path.resolve('./node_modules/jquery/dist/jquery.min.js'),
			jQuery: path.resolve('./node_modules/jquery/dist/jquery.min.js'),
			'window.jQuery': path.resolve('./node_modules/jquery/dist/jquery.min.js')
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				stylus: {
					use: [poststylus([ autoprefixer({browsers: 'last 2 versions', grid: true}), 'rucksack-css' ])]
				}
			}
		})
	],

	module: {
		rules : [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader'
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				options: {
					pretty: true
				}
			}, {
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader'],
					publicPath: '../../'
				})
			}, {
				test: /\.sass$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader'],
					publicPath: '../../'
				})
			}, {
				test: /\.styl/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'stylus-loader'],
					publicPath: '../../'
				})
			}, {
				test: /\.css/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader'],
					publicPath: '../../'
				})
			},
			{
				test: /\.(pdf|doc|docx)$/,
				use: [{
					loader: 'file-loader',
					options: {
						outputPath: paths.buildDocs
					}
				}]
			},{
				test:/\.(eot|svg|ttf|woff|woff2)$/,
				use: [{
					loader: 'file-loader',
					options: {
						outputPath: paths.buildFonts
					}
				}]
			},{
				test: /\.ico$/,
				loaders: [
					{
						loader: 'file-loader',
						options: {
							outputPath: paths.buildImages
						}
					}
				]
			},{
				test: /\.(png|jpe?g|gif)$/,
				loaders: [
					{
						loader: 'file-loader',
						options: {
							outputPath: paths.buildImages
						}
					},{
						loader: 'imagemin-loader',
						options: {
							enabled: !isDev(),
							plugins: [
								{
									use: 'imagemin-pngquant',
									options: {
										quality: '50-60'
									}
								}
							]
						}
					},{
						loader: 'image-maxsize-webpack-loader',
						options: {
							'useImageMagick': false
						}
					}
				]
			}
		]
	}
};