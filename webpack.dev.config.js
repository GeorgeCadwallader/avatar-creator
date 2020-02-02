var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, './src');

module.exports = {
	entry: [
		path.join(parentDir, 'index.js')
	],
	module: {
		rules: [
      {
        test: /(\.css|.scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env']
            }
          }
        ]
			}
		]
	},
	output: {
			path: parentDir + '/dist',
			filename: 'bundle.js'
	},
	devServer: {
			contentBase: parentDir,
			historyApiFallback: true
	}
}