import React from 'react';
import request from 'superagent';
import TaskCards from './TaskCards';
import AppHeader from './AppHeader';

class BakuhaTodo extends React.Component {
  constructor(props) {
    super(props);
    const USER_ID = window.location.pathname.substring(1).slice(0, -1);
    this.state = {
      taskData: [],
      editMode: false,
      focusedId: '',
      focusedTitle: '',
      focusedDeadline: '',
      focusedContent: '',
      currentUser: USER_ID
    };
  }

  // マウントされるタイミングでタスクデータを取ってくる
  componentWillMount = () => {
    this.getData();
  };

  detectId = _id => e => {
    this.setState({
      focusedId: _id
    });
  };

  // DBからデータを取得
  getData = () => {
    request
      .get(`/api/getData/${this.state.currentUser}`)
      .then(data => {
        this.setState({
          taskData: data.body
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  // タスクの追加
  addData = e => {
    request
      .get(`/api/addData/${this.state.currentUser}`)
      .then(() => {
        this.getData();
      })
      .catch(err => {
        console.error(err);
      });
  };

  // タスクの削除
  removeData = _id => e => {
    request
      .get('/api/removeData')
      .query({ _id: _id })
      .then(res => {
        console.log(res.body + 'つの項目を削除しました。');
        this.getData();
      })
      .catch(err => {
        console.error(err);
      });
  };

  // 編集・閲覧モードの切り替え
  switchMode = data => e => {
    const { _id, title, deadline, content } = data;
    // 編集モード → 閲覧モード
    if (this.state.editMode) {
      request
        .get('/api/updateData')
        .query({
          _id: _id,
          title: this.state.focusedTitle,
          deadline: this.state.focusedDeadline,
          content: this.state.focusedContent
        })
        .then(res => {
          console.log(res.body + 'つの項目を更新しました。');
          this.setState({
            focusedTitle: '',
            focusedDeadline: '',
            focusedContent: ''
          });
          this.setState({ editMode: false });
          this.getData();
        })
        .catch(err => {
          console.error(err);
        });
      // 閲覧モード → 編集モード
    } else if (!this.state.editMode) {
      this.setState({
        focusedId: _id,
        focusedTitle: title,
        focusedDeadline: deadline,
        focusedContent: content,
        editMode: true
      });
    } else {
      console.log('エラーが発生しました。');
    }
  };

  // 編集時のイベントハンドラ
  titleChange = e => {
    this.setState({ focusedTitle: e.target.value });
  };

  deadlineChange = e => {
    this.setState({ focusedDeadline: e.target.value });
  };

  contentChange = e => {
    this.setState({ focusedContent: e.target.value });
  };

  // ドラッグした時にポジションを更新
  updatePosition = (l, t) => {
    console.log(`left：${l} / top：${t}`);
    request
      .get('/api/updatePosition')
      .query({
        _id: this.state.focusedId,
        left: l,
        top: t
      })
      .then(res => {
        console.log(`${res.body}つのポジションを更新しました。`);
      })
      .catch(err => {
        console.error(err);
      });
  };

  // リサイズした時にサイズを更新
  updateSize = (w, h) => {
    console.log(`width：${w} / height：${h}`);
    request
      .get('/api/updateSize')
      .query({
        _id: this.state.focusedId,
        width: w,
        height: h
      })
      .then(res => {
        console.log(`${res.body}つのサイズを更新しました。`);
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <AppHeader addData={this.addData} />
        <div
          style={{
            margin: 0,
            padding: 0,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            position: 'fixed'
          }}
          className="area"
        >
          <TaskCards
            taskData={this.state.taskData}
            detectId={this.detectId}
            switchMode={this.switchMode}
            removeData={this.removeData}
            updatePosition={this.updatePosition}
            updateSize={this.updateSize}
            editMode={this.state.editMode}
            titleChange={this.titleChange}
            deadlineChange={this.deadlineChange}
            contentChange={this.contentChange}
            focusedId={this.state.focusedId}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default BakuhaTodo;
