var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
    entry: "./app.js",
    output: {
        path: 'D:/02 JACK/Projects/shop-api/shop-server/public',
        filename: "bundle.js"
    },
    module: {
        loaders: [{
          test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader", "sass-loader")
        }, {
            test: /\.(pug|jade)$/,
            loader: "pug-html-loader"
        }, ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ],
    resolve: {
        modulesDirectories: ["web_modules", "node_modules", "bower_components"]
    }
};
