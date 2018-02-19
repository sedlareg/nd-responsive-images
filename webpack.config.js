const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'app'),
    dist: path.join(__dirname, 'dist')
};

const htmlWebPack = new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'app/template.html'
});

const extractCSS  = new ExtractTextPlugin('css/styles.css');
const cleanDIst = new CleanWebpackPlugin(['dist']);

module.exports = {
    context: __dirname,
    entry: [
        path.join(PATHS.app, 'template.html'),
        path.join(PATHS.app, 'css/main.css')
    ],
    output: {
        path: PATHS.dist,
        filename: 'index.js'
    },
    watch: false,
    devServer: {
        inline: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /.*\.(gif|png|jpe?g)$/i,
                loader: 'responsive-loader',
                options: {
                    quality: 40,
                    sizes: [400, 800, 1280],
                    name: 'images/[name]_[width].[ext]'
                    // name: 'images/[name]-[hash]-[width].[ext]'
                }
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: false,
                        removeComments: true,
                        collapseWhitespace: false
                    }
                }
            },
        ]
    },
    plugins: [
        cleanDIst,
        extractCSS,
        htmlWebPack
    ]
};
