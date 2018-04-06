const NeDB = require('nedb')
const path = require('path')
const db = new NeDB({
  filename: path.join(__dirname, 'task.db'),
  autoload: true
})

const express = require('express')
const app = express()
const portNo = process.env.PORT || 3000
app.listen(portNo, () => {
  console.log('サーバー起動', `http:localhost:${portNo}`)
})

app.use('/', express.static('./public'))

app.get('/api/getTasksData', (req, res) => {
  db.find({}, (err, data) => {
    if (err) {
      sendJSON(res, false, {logs: {}, msg: err})
      return
    }
    console.log(data)
    sendJSON(res, true, {logs: data})
  })
})

app.get('/api/addTask', (req, res) => {
  db.find({}, (err, data) => {
    if (err) {
      sendJSON(res, false, {logs: {}, msg: err})
      return
    }
    console.log('タスクを追加')
  })
})

app.get('/api/updateTask', (req, res) => {
  db.find({}, (err, data) => {
    if (err) {
      sendJSON(res, false, {logs: {}, msg: err})
      return
    }
    console.log('タスクを更新')
  })
})

app.get('/api/updatePosition', (req, res) => {
  db.find({}, (err, data) => {
    if (err) {
      sendJSON(res, false, {logs: {}, msg: err})
      return
    }
    console.log('位置を更新')
  })
})

app.get('/api/updateSize', (req, res) => {
  db.find({}, (err, data) => {
    if (err) {
      sendJSON(res, false, {logs: {}, msg: err})
      return
    }
    console.log('サイズを更新')
  })
})

app.get('/api/removeTask', (req, res) => {
  db.find({}, (err, data) => {
    if (err) {
      sendJSON(res, false, {logs: {}, msg: err})
      return
    }
    console.log('タスクを爆破')
  })
})

const sendJSON = (res, result, obj) => {
  obj['result'] = result
  res.json(obj)
}
