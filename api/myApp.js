const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config()

console.log('Hello World');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', (req, res) => {
  const hello = process.env.MESSAGE_STYLE === 'uppercase' ? "Hello json".toUpperCase() : "Hello json";
  res.json({"message": hello});
});

app.get('/:word/echo', (req, res) => {
  res.json({"message": req.params.word});
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.send({time: req.time});
});

































module.exports = app;
