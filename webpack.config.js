const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
  mode: IS_PROD ? 'production' : 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    popup: path.resolve(__dirname, 'src', 'popup'),
    'service-worker': path.resolve(__dirname, 'src', 'service-worker'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  ...(IS_PROD ? {
    optimization: {
      minimize: true,
      minimizer: [
        (compiler) => {
          const TerserPlugin = require('terser-webpack-plugin');

          new TerserPlugin({
            parallel: true,
            extractComments: false,
            terserOptions: {
              format: {
                comments: false,
              }
            },
          }).apply(compiler);
        },
      ],
    }
  }: {}),
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/template.html',
      filename: 'popup.html',
      inject: 'body',
      chunks : ['popup'],
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/*.html'],
          },
        },
      ],
    }),
  ],
};
