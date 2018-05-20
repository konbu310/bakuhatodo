const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  deadline: String,
  content: String,
  left: String,
  top: String,
  width: String,
  height: String,
  user: String
});

module.exports = mongoose.model('task', TaskSchema);
