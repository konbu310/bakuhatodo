import React from 'react';
import request from 'superagent';
import TaskCards from './TaskCards';
import AppHeader from './AppHeader';
import bakuhaGif from '../assets/bakuha.gif';

/**
 * 爆破ToDOのメインコンポーネント
 * イベントハンドラ、stateを一元管理
 * @class BakuhaTodo
 * @extends {React.Component}
 */
class BakuhaTodo extends React.Component {
  constructor(props) {
    super(props);
    const USER_ID = props.match.params.id;
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

  /**
   * コンポーネントマウント時の処理
   * @memberof BakuhaTodo
   */
  componentWillMount = () => {
    this.getData();
  };

  /**
   * DBからタスクのデータを取得し保存
   * @memberof BakuhaTodo
   */
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

  /**
   * リサイズ・ドラッグの開始時にCardのIDを取得し保存する
   * @memberof BakuhaTodo
   */
  detectId = _id => e => {
    this.setState({
      focusedId: _id
    });
  };

  /**
   * DBにタスクデータを追加し、再度データを取得
   * @memberof BakuhaTodo
   */
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

  setElments = _id => e => {
    const cardElm = document.getElementById(`card${_id}`);
    const gifElm = document.getElementById(`bakuhaGif${_id}`);
    const gifStyle = gifElm.style;
    const gifSrc = `${bakuhaGif}?${_id}`;
    const mp3Elm = document.getElementById(`bakuhaMp3${_id}`);
    this.renderBakuha(_id, cardElm, gifStyle, gifElm, gifSrc, mp3Elm);
  };

  renderBakuha = (_id, cardElm, gifStyle, gifElm, gifSrc, mp3Elm) => {
    gifStyle.display = '';
    gifStyle.position = 'absolute';
    gifStyle.bottom = '-100%';
    gifStyle.right = '-100%';
    cardElm.style.visibility = 'hidden';
    gifElm.setAttribute('src', gifSrc);
    mp3Elm.play();
    mp3Elm.addEventListener(
      'ended',
      () => {
        this.removeData(_id);
      },
      false
    );
  };

  /**
   * 爆破演出が終了後、DBからデータを削除
   * @memberof BakuhaTodo
   */
  removeData = _id => {
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

  /**
   * カードの閲覧モードと編集モードの切替
   * stateのeditModeとcurrentIDを見て判断する
   * @memberof BakuhaTodo
   */
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

  /**
   * タスクの編集を検知してstateを更新する
   * @memberof BakuhaTodo
   */
  handleEdit = type => e => {
    type === 'title'
      ? this.setState({ focusedTitle: e.target.value })
      : type === 'deadline'
        ? this.setState({ focusedDeadline: e.target.value })
        : type === 'content'
          ? this.setState({ focusedContent: e.target.value })
          : console.log('エラー');
  };

  /**
   * ドラッグを止めた時に位置データを更新する
   * @memberof BakuhaTodo
   */
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
        console.log('ポジションを更新');
      })
      .catch(err => {
        console.error(err);
      });
  };

  /**
   * リサイズを止めた時にサイズデータを更新する
   * @memberof BakuhaTodo
   */
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
        console.log('サイズを更新');
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <AppHeader
          MenuBtn
          clickBtn={this.addData}
          btnValue="タスクを追加する"
          currentUser={this.state.currentUser}
        />
        <div
          className="area"
          style={{
            overflow: 'hidden',
            margin: 0,
            padding: 0,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            position: 'fixed'
          }}
        >
          <TaskCards
            taskData={this.state.taskData}
            detectId={this.detectId}
            switchMode={this.switchMode}
            removeData={this.setElments}
            updatePosition={this.updatePosition}
            updateSize={this.updateSize}
            editMode={this.state.editMode}
            handleEdit={this.handleEdit}
            focusedId={this.state.focusedId}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default BakuhaTodo;
