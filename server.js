'use strict';

require('dotenv').load();
var fs = require('fs');
var http = require('http');
var express = require('express');
var socket = require('socket.io');
var mongoose = require('mongoose');
var config = require('./config/config');

var app = express();
var server = http.Server(app);
var io = socket.listen(server);
var port = process.env.PORT || 3000;

var OpenTok = require('opentok');
var openTok = new OpenTok(config.openTok.key, config.openTok.secret);

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Bootstrap socket.io settings
require('./config/io')(io);

// Bootstrap application settings
require('./config/express')(app, {io: io, openTok: openTok});

// Bootstrap routes
require('./config/routes')(app);

server.listen(port);
console.log('Express app started on port ' + port);
