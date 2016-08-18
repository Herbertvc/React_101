const path = require('path');
var webpack = require('webpack');

const PATHS = {
	build: path.join(__dirname,'build'),
	src: path.join(__dirname,'src')
}

module.exports = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:8080',
		'webpack/hot/only-dev-server',
		PATHS.src
	]
	,
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'react-hot!babel'
		}]
	},
	devServer: {
		host: "0.0.0.0",
		contentBase: PATHS.build,
		historyApiFallback: true,
		hot: true,
		inline: true,
		noInfo: true,
		progress: true,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}