var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/', function(req, res) {
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(5000);
