import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import WebpackHookPlugin from 'webpack-hook-plugin';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const IS_PROD = process.env.NODE_ENV === 'production';

export default {
  mode: IS_PROD ? 'production' : 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    popup: path.resolve(__dirname, 'src', 'popup'),
    'service-worker': path.resolve(__dirname, 'src', 'service-worker'),
  },
  output: {
    path: path.join(__dirname, process.env.BUILD_PATH),
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
        options: {
          transpileOnly: true,
        },
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
        async (compiler) => {
          const TerserPlugin = await import('terser-webpack-plugin');

          new TerserPlugin.default({
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
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        diagnosticOptions: {
          syntactic: true,
        },
        mode: 'write-references'
      },
      issue: {
        exclude: [
          {
            file: 'node_modules/**/*.tsx'
          },
          {
            file: 'node_modules/**/*.ts'
          }
        ],
      },
    }),
    new HtmlWebpackPlugin({
      title: process.env.TITLE,
      template: './public/template.html',
      filename: 'popup.html',
      inject: 'body',
      chunks : ['popup'],
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/*.html', '**/*.js'],
          },
        },
      ],
    }),
    new WebpackHookPlugin({
      onBuildEnd: ['npm run manifest']
    })
  ],
};
