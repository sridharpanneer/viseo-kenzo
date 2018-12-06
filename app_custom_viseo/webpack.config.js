var path = require('path');
    var ExtractTextPlugin = require('sgmf-scripts')['extract-text-webpack-plugin'];
    var sgmfScripts = require('sgmf-scripts');

    module.exports = [{
        mode: 'production',
        name: 'js',
        entry: sgmfScripts.createJsPath(),
        output: {
            path: path.resolve('./cartridges/app_custom_viseo/cartridge/static/'),
            filename: '[name].js'
        }
    }, {
        mode: 'none',
        name: 'scss',
        entry: sgmfScripts.createScssPath(),
        output: {
            path: path.resolve('./cartridges/app_custom_viseo/cartridge/static'),
            filename: '[name].css'
        },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        url: false,
                        minimize: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('autoprefixer')()
                        ]
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        includePaths: [
                            path.resolve(process.cwd(), '../storefront-reference-architecture/node_modules/'),
							path.resolve(process.cwd(), '../storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/scss'),
							path.resolve(process.cwd(), '../storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js')
                        ]
                    }
                }]
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin({ filename: '[name].css' })
    ]
    }];