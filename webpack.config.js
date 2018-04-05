const path = require('path')

// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = 'development'

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = (MODE === 'development')

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: MODE,

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: path.join(__dirname, 'src/index.js'),

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: path.join(__dirname, 'public'),
    // 出力ファイル名
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: 'babel-loader',
            // Babel のオプションを指定する
            options: {
              presets: [
                // env を指定することで、ES2017 を ES5 に変換。
                // {modules: false}にしないと import 文が Babel によって CommonJS に変換され、
                // webpack の Tree Shaking 機能が使えない
                ['env', {'modules': false}],
                // React の JSX を解釈
                'react'
              ]
            }
          }
        ],
        // node_modules は除外する
        exclude: /node_modules/
      },
      {
        // 対象となるファイルの拡張子
        test: /\.css/,
        // ローダー名
        use: [
          // linkタグに出力する機能
          'style-loader',
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // CSSの空白文字を削除する
              minimize: true,
              // ソースマップを有効にする
              sourceMap: enabledSourceMap
            }
          }
        ]
      }
    ]
  }
}
