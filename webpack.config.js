const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ASSET_PATH = process.env.ASSET_PATH || '/public/';

module.exports = {
  devtool: 'eval-source-map',

  entry: {
    polyfills: './src/polyfills.ts',
    app: './src/main.ts',
  },

  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: ASSET_PATH,
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader?',
          'angular2-template-loader',
          '@angularclass/hmr-loader',
        ],
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|mp3)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader?name=assets/[name].[ext]?',
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'src/app'),
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
          // use: ['css-loader', 'postcss-loader'],
       // }),
       use: ['to-string-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/app'),
        use: ['to-string-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: 'tslint-loader',
      },
    ],
  },

  plugins: [
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      path.resolve(__dirname, './src'),
    ),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({ filename: 'css/[name].css', disable: false }),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false,
        },
        postcss: [
          autoprefixer({
            browsers: ['last 2 version'],
          }),
        ],
      },
    }),
  ],

};
