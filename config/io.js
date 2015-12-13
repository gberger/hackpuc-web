'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Alert = mongoose.model('Alert');
var Firing = mongoose.model('Firing');
var Status = mongoose.model('Status');

module.exports = function(io) {
  io.sockets.on('connection', function (socket) {
    socket.on('subscribe', function(data) { socket.join(data.room); });
    socket.on('unsubscribe', function(data) { socket.leave(data.room); });
  });
};
