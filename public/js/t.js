"use strict";

var socket = io.connect();

socket.emit('subscribe', { room: trackingId });

socket.on('status', function(status) {
  console.log(status);
});
