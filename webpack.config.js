module.exports = {
    entry: './src/js/app.js',
    output: {
        path: __dirname + '/public/assets/js',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.gif|png|jpg|eot|wof|woff|ttf|svg$/,
                use: ['url-loader']
            }
        ]
    }
}