const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config()

console.log('Hello World');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})

app.get('/json', (req, res) => {
  const hello = process.env.MESSAGE_STYLE === 'uppercase' ? "Hello json".toUpperCase() : "Hello json";
  res.json({"message": hello});
})

































module.exports = app;
