const express = require('express');
const NeDB = require('nedb');
const path = require('path');

// DBの設定
const db = new NeDB({
  filename: path.join(__dirname, 'task.db'),
  autoload: true
});

// サーバーの設定
const app = express();
const portNo = process.env.PORT || 3000;
app.listen(portNo, () => {
  console.log('サーバー起動：', `http:localhost:${portNo}`);
});

app.use('/', express.static('./public'));

app.get('/api/getData', (req, res) => {
  db.find({}, (err, data) => {
    if (err) {
      console.error(err);
      res.json(err);
    }
    console.log(data);
    res.json(data);
  });
});

app.get('/api/addData', (req, res) => {
  db.insert(
    {
      title: '',
      deadline: '',
      content: '',
      left: '20',
      top: '20',
      width: '300',
      height: '200'
    },
    (err, newDoc) => {
      if (err) {
        console.error(err);
        res.json(err);
      }
      res.json(newDoc);
    }
  );
});

app.get('/api/updateData', (req, res) => {
  const q = req.query;
  db.update(
    { _id: q._id },
    { $set: { title: q.title, deadline: q.deadline, content: q.content } },
    { multi: true },
    (err, numOfReplaced) => {
      if (err) {
        console.error(err);
        res.json(err);
      }
      res.json(numOfReplaced);
    }
  );
});

app.get('/api/updatePosition', (req, res) => {
  const q = req.query;
  db.update(
    { _id: q._id },
    { $set: { left: q.left, top: q.top } },
    {},
    (err, numOfReplaced) => {
      if (err) {
        console.error(err);
        res.json(err);
      }
      res.json(numOfReplaced);
    }
  );
});

app.get('/api/updateSize', (req, res) => {
  const q = req.query;
  db.update(
    { _id: q._id },
    { $set: { width: q.width, height: q.height } },
    {},
    (err, numOfReplaced) => {
      if (err) {
        console.error(err);
        res.json(err);
      }
      res.json(numOfReplaced);
    }
  );
});

app.get('/api/removeData', (req, res) => {
  const q = req.query;
  db.remove({ _id: q._id }, {}, (err, numOfRemoved) => {
    if (err) {
      console.error(err);
      res.json(err);
    }
    res.json(numOfRemoved);
  });
});
