const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/task');
const path = require('path');
const app = express();
const portNo = process.env.PORT || 3000;

// DBに接続
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/bakuhatodo',
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log('MongoDB接続');
    }
  }
);

// サーバー起動
app.listen(portNo, () => {
  console.log('サーバー起動：', `http:localhost:${portNo}`);
});

app.use('/', express.static('./dist'));
app.use('/:id', express.static('./dist'));

// DBからデータを取得
app.get('/api/getData/:id', (req, res) => {
  const user = req.params.id;
  Task.find({ user: user }, (err, docs) => {
    if (err) {
      console.error(err);
      res.send(err);
    }
    console.log(docs);
    res.json(docs);
  });
});

// DBにデータを追加
app.get('/api/addData/:id', (req, res) => {
  const user = req.params.id;
  let newData = new Task({
    title: '',
    deadline: '',
    content: '',
    left: '20',
    top: '20',
    width: '300',
    height: '200',
    user: user
  });
  newData.save(err => {
    if (err) {
      console.error(err);
      res.send(err);
    }
    res.sendStatus(200);
  });
});

// DBのデータを更新
app.get('/api/updateData', (req, res) => {
  const q = req.query;
  Task.update(
    { _id: q._id },
    { $set: { title: q.title, deadline: q.deadline, content: q.content } },
    (err, rawResponse) => {
      if (err) {
        console.error(err);
        res.send(err);
      }
      res.send('success');
    }
  );
});

// DBのポジションデータを更新
app.get('/api/updatePosition', (req, res) => {
  const q = req.query;
  Task.update(
    { _id: q._id },
    { $set: { left: q.left, top: q.top } },
    (err, rawResponse) => {
      if (err) {
        console.error(err);
        res.send(err);
      }
      res.send('success');
    }
  );
});

// DBのサイズデータを更新
app.get('/api/updateSize', (req, res) => {
  const q = req.query;
  Task.update(
    { _id: q._id },
    { $set: { width: q.width, height: q.height } },
    (err, rawResponse) => {
      if (err) {
        console.error(err);
        res.send(err);
      }
      res.sendStatus(200);
    }
  );
});

// DBのデータを削除
app.get('/api/removeData', (req, res) => {
  const q = req.query;
  Task.remove({ _id: q._id }, err => {
    if (err) {
      console.error(err);
      res.send(err);
    }
    res.sendStatus(200);
  });
});
