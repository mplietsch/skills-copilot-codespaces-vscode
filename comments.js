// create web server
// create database connection
// create schema
// create model
// create route
// create view
// create controller
// create middleware
// create test
// create documentation
// create logger

// 1. create web server
const express = require('express');
const app = express();
const port = 3000;

// 2. create database connection
const mongoose = require('mongoose');
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
  console.log('Connected to mongod server');
});
mongoose.connect('mongodb://localhost/mongodb_tutorial');

// 3. create schema
const commentSchema = mongoose.Schema({
  name: String,
  comment: String,
  created_at: { type: Date, default: Date.now },
});

// 4. create model
const Comment = mongoose.model('comment', commentSchema);

// 5. create route
// 5-1. index
app.get('/', function (req, res) {
  res.send('Hello World');
});

// 5-2. comment list
app.get('/comments', function (req, res) {
  Comment.find(function (err, comments) {
    if (err) return res.status(500).send({ error: 'database failure' });
    res.json(comments);
  });
});

// 5-3. comment show
app.get('/comments/:comment_id', function (req, res) {
  Comment.findOne({ _id: req.params.comment_id }, function (err, comment) {
    if (err) return res.status(500).json({ error: err });
    if (!comment) return res.status(404).json({ error: 'comment not found' });
    res.json(comment);
  });
});

// 5-4. comment create
app.post('/comments', function (req, res) {
  const comment = new Comment();
  comment.name = req.body.name;
  comment.comment = req.body.comment;
  comment.save(function (err) {
    if (err) {
      console.error(err);
      res.json({ result: 0 });
      return;
    }
    res.json({ result: 1 });
  });
});

// 5-5. comment update
app.put('/comments/:comment_id', function (req, res) {
  Comment.findById(req.params.comment_id, function (err, comment) {
    if (err)
        return res.status(500).json({ error: 'database failure' });});});