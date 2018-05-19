import React from 'react';
import AppHeader from './AppHeader';
import AddIdModal from './AddIdModal';

class Top extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputId: '/',
      isOpen: false
    };
  }
  openModal = () => {
    this.setState({ isOpen: true });
  };

  onChange = (e, d) => {
    this.setState({ inputId: `/${e.target.value}` });
  };

  onClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <div>
        <AppHeader topPage addData={this.openModal} />;
        <article style={{ marginTop: 80, marginLeft: 30 }}>
          <h2>爆破ToDoとは？</h2>
          <p>
            爆破ToDoは、完遂したタスクを爆破することで圧倒的達成感を得ることのできるToDo管理アプリです。
          </p>

          <h2>使い方</h2>
          <p>右上のボタンからIDを作成してください。パスワードはありません。</p>

          <h2>注意事項</h2>
          <p>
            気軽に使うことを目的としているため、本アプリにパスワードは存在しません。<br />
            その為、IDがわかれば勝手に閲覧・追加・削除が可能となってしまいます。<br />
          </p>
        </article>
        <AddIdModal
          isOpen={this.state.isOpen}
          inputId={this.state.inputId}
          onChange={this.onChange}
          onClose={this.onClose}
        />
      </div>
    );
  }
}

export default Top;
