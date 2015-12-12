"use strict";

var myLatlng = new google.maps.LatLng(-22.97982535792792, -43.23314334269914);
var mapOptions = {
  zoom: 13,
  center: myLatlng,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById("map"), mapOptions);


var poly = new google.maps.Polyline({
  map: map,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2
});



var socket = io.connect();
var initialMarker, finalMarker;
var initialInfoWindow = new google.maps.InfoWindow({content: "Localização inicial."});
var finalInfoWindow = new google.maps.InfoWindow({content: "Última localização."});
socket.on('status', function(status) {
  status.date = new Date(status.timestamp);
  poly.getPath().push(new google.maps.LatLng(status.latitude, status.longitude));

  if (poly.getPath().length == 1) {
    initialMarker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(status.latitude, status.longitude)
    });
    initialInfoWindow.setContent("Localização inicial: " + status.latitude + ", " + status.longitude + " em " + status.date);
    initialMarker.addListener('click', function() {
      initialInfoWindow.open(map, initialMarker);
    });
  } else if (poly.getPath().length == 2) {
    finalMarker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(status.latitude, status.longitude)
    });
    finalMarker.addListener('click', function() {
      finalInfoWindow.open(map, finalMarker);
    });
  } else {
    finalInfoWindow.setContent("Localização inicial: " + status.latitude + ", " + status.longitude + " em " + status.date);
    finalMarker.setPosition(new google.maps.LatLng(status.latitude, status.longitude));
  }
});

socket.emit('subscribe', { room: trackingId });
