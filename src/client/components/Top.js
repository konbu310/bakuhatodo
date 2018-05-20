import React from 'react';
import AppHeader from './AppHeader';

const Top = () => (
  <div
    style={{
      margin: 0,
      padding: 0,
      width: '100vw',
      height: '100vh'
    }}
  >
    <AppHeader />;
    <article
      style={{
        display: 'block',
        position: 'absolute',
        top: 150,
        left: '20vw'
      }}
    >
      <h1
        style={{
          fontSize: '5vw',
          fontFamily: '"ヒラギノ明朝 ProN W6", "メイリオ"'
        }}
      >
        <span style={{ color: 'red' }}>爆破</span>ToDo
      </h1>

      <h3> - 爆破ToDoとは？</h3>
      <p>
        爆破ToDoは、完遂したタスクを爆破することで圧倒的達成感を得ることのできるToDo管理アプリです。
      </p>

      <h3> - 使い方</h3>
      <p>
        URLの末尾に適当なIDを入力してください。パスワードはありません。<br />
        自分のページに言ったら右上のボタンからタスクを追加できます。
      </p>

      <h3> - 注意事項</h3>
      <p>
        気軽に使えるようにするため、本アプリにパスワード等は存在しません。<br />
        その為、IDがわかれば勝手に閲覧・追加・削除が可能となってしまいます。<br />
        くれぐれもご注意ください。
      </p>
    </article>
    <footer
      style={{
        position: 'absolute',
        bottom: 0,
        left: '40vw',
        textAlign: 'center'
      }}
    >
      <small>BakuhaToDo created by konbu310 @ 2018</small>
    </footer>
  </div>
);

export default Top;
