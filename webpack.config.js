var path = require("path");
let webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		app: "./src/index.js",
		vendor: ["react", "react-dom"]
	},
	output: {
		path: path.resolve("dist"),
		filename: "bundle.js",
		publicPath: "/"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
            {
              test: /\.css$/,
              use: [
                { loader: "style-loader" },
                {
                  loader: "css-loader"
                }
              ]
            },
    
            { test: /\.(gif|jpg|svg)$/, use: ["file-loader"] },
            { test: /\.png$/, use: ["url-loader?mimetype=image/png"] }
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			filename: "index.html",
			inject: "body"
		  })
	],
	resolve: {
		extensions: ["*", ".js", ".jsx"]
	},
	devServer: {
        contentBase: "./dist",
        hot: true
	}
};
