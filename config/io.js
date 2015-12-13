'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Alert = mongoose.model('Alert');
var Firing = mongoose.model('Firing');
var Status = mongoose.model('Status');

module.exports = function(io) {
  io.sockets.on('connection', function (socket) {
    socket.on('subscribe', function(data) {
      Firing.findById(data.room, function(err, firing) {
        socket.join(data.room);

        Status.find({firing: firing}).sort({timestamp: 'ascending'}).exec(function(err, statuses) {
          if (err) console.log(err);
          for(var status of statuses) {
            socket.emit('status', status)
          }
        });
      });
    });
    socket.on('unsubscribe', function(data) {
      socket.leave(data.room);
    });
  });
};
