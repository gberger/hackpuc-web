'use strict';

module.exports = function(io) {
  io.sockets.on('connection', function (socket) {
    socket.on('subscribe', function(data) { socket.join(data.room); });
    socket.on('unsubscribe', function(data) { socket.leave(data.room); });
  });
};
