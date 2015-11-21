'use strict';

const NODE_ENV = process.env.NODE_ENV || 'dev';
const webpack = require('webpack');

module.exports = {
	entry: [
		'./scripts/main'
	],
	output: {
		path: __dirname,
		filename: "build.js",
		library: "app"
	},
	devtool: NODE_ENV == 'dev' ? 'eval' : null,

	watch: NODE_ENV == 'dev',
	watchOptions: {
		// время ожидания пересборки
		aggregateTimeout: 50 // default 300
	},

	resolve: {
		alias: {
			'jQuery': __dirname + '/node_modules/jquery/dist/jquery',
			'Backbone': __dirname + '/node_modules/backbone/backbone.js'
		}
	},

	plugins: [
		// Экспорт переменной в js
		// Для разделения PROD и DEV
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		})
	],

	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			exclude: /(node_modules|bower_components)/,
			query: {
				presets: ['es2015', 'stage-0']
			}
		}]
	},

	noParse: /babel/,

	devServer: {
		port: 5000,
		hot: true
	}
}

if (NODE_ENV == 'prod') {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false }
		})
	)
}
