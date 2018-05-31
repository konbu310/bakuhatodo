const path = require('path');
const MODE = 'production';
const enabledSourceMap = MODE === 'development';

module.exports = {
  target: 'web',
  mode: MODE,
  entry: path.join(__dirname, 'src/client/index.js'),
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'react',
                [
                  'env',
                  {
                    modules: false,
                    targets: {
                      browsers: ['defaults']
                    }
                  }
                ]
              ],
              plugins: ['transform-class-properties']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              minimize: true,
              sourceMap: enabledSourceMap
            }
          }
        ]
      }
    ]
  }
};
