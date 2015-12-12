"use strict";

var socket = io.connect();

socket.emit('subscribe', { room: trackingId });

socket.on('status', function(status) {
  console.log(status);
});

var myLatlng = new google.maps.LatLng(-34.397, 150.644);
var mapOptions = {
  zoom: 8,
  center: myLatlng,
  mapTypeId: google.maps.MapTypeId.SATELLITE
};
var map = new google.maps.Map(document.getElementById("map"),
  mapOptions);