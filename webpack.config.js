/**
 * Created by rvum on 2016/12/10.
 */
var webpack = require('webpack');

module.exports = {
    entry: './client/index.js',
    output: {
        path: __dirname + "/client/dist",
        filename: 'zzb.js'
    },
    module: {
        loaders: [
            {
                "test": /\.vm?$/, "loader": "html"
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                "test": /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                "loader": "url-loader?limit=10000&name=../images-and-fonts/[name].[ext]"
            }
            // ,
            // {
            //     "test": /\.less/,
            //     "loader": 'style-loader!css-loader!less-loader'
            // },
            // {
            //     "test": /\.css$/,
            //     "loader": ExtractTextPlugin.extract("style-loader", "css-loader")
            // }
        ]
    },
    node:{
        fs: 'empty'
    },
    plugins: [
        new webpack.BannerPlugin('created by rvum'),
        // CSS打包成文件必须在JS中require，使用插件打包为文件，不然直接打包到页面行内样式
        // new ExtractTextPlugin("./skin/zzb.css"),
        new webpack.ProvidePlugin({
            Velocity: "velocityjs"
        })
    ]
}