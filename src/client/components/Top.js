import React from 'react';
import AppHeader from './AppHeader';

const Top = () => (
  <div>
    <AppHeader />;
    <article style={{ marginTop: 80, marginLeft: 80 }}>
      <h2>爆破ToDoとは？</h2>
      <p>
        爆破ToDoは、完遂したタスクを爆破することで圧倒的達成感を得ることのできるToDo管理アプリです。
      </p>

      <h2>使い方</h2>
      <p>
        URLの末尾に適当なIDを入力してください。パスワードはありません。<br />
        自分のページに言ったら右上のボタンからタスクを追加できます。
      </p>

      <h2>注意事項</h2>
      <p>
        気軽に使えるようにするため、本アプリにパスワード等は存在しません。<br />
        その為、IDがわかれば勝手に閲覧・追加・削除が可能となってしまいます。<br />
        くれぐれもご注意ください。
      </p>
    </article>
  </div>
);

export default Top;
