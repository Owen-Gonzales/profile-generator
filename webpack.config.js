const path = require('path')
const html_plugin = require('html-webpack-plugin')
const mini_css_extract = require('mini-css-extract-plugin')
const css_minimizer = require('css-minimizer-webpack-plugin')
const terser_plugin = require('terser-webpack-plugin')
const dotenv = require('dotenv-webpack')

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		clean: true,
	},
	mode: 'production',
	resolve: {
		extensions: ['.js'],
		alias: {
			'@utils': path.resolve(__dirname, 'src/utils/'),
			'@templates': path.resolve(__dirname, 'src/templates/'),
			'@styles': path.resolve(__dirname, 'src/styles/'),
			'@images': path.resolve(__dirname, 'src/assets/images/')
		}
	},
	module: {
		rules: [
			{
				test: /\.m?js/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(css|styl)/,
				use: [mini_css_extract.loader,
					'css-loader',
					'stylus-loader']
			},
			{
				test: /\.(jpg|jpeg|png|svg|gif)$/,
				type: 'asset/resource',
				generator: {
					filename: './assets/images/[name].[contenthash][ext][query]'
				}
			},
			{
				test: /\.(woff|woff2)/,
				type: 'asset/resource',
				generator: {
					filename: './assets/fonts/[name].[contenthash][ext][query]'
				}
			}
		]
	},
	plugins: [
		new html_plugin({
			inject: true,
			template: './public/index.html',
			filename: './index.html'
		}),
		new mini_css_extract({
			filename: './[name].[contenthash].css'
		},
			new dotenv()
		),
	],
	optimization: {
		minimize: true,
		minimizer: [
			new css_minimizer(),
			new terser_plugin()
		]
	}
}
