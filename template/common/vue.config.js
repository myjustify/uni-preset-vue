// 预览压缩js
// const TerserPlugin = require("terser-webpack-plugin");
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin') //最新版本copy-webpack-plugin插件暂不兼容，推荐v5.0.0
module.exports = {
	configureWebpack: {
		// 	optimization: {
		// 		minimize: true,
		// 		minimizer: [
		// 			new TerserPlugin({
		// 				exclude: /\/node_modules/,
		// 				terserOptions: {
		// 					format: {
		// 						comments: false,
		// 					},
		// 				},
		// 				extractComments: false,
		// 			}),
		// 		],
		// 	},
		plugins: [
			new CopyWebpackPlugin([
				{
					from: path.join(__dirname, './src/cloudfunctions'),
					to: path.join(__dirname, 'dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev', process.env.UNI_PLATFORM, 'cloudfunctions'),
				},
			]),
		],
	}
}

