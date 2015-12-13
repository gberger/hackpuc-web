"use strict";

/*
 * INITIALIZE OPENTOK
 */
if (OT.checkSystemRequirements() == 1) {
  var session = OT.initSession(apiKey, sessionId);
  session.on("streamCreated", function (event) {
    console.log("New stream in the session: " + event.stream.streamId);
    session.subscribe(event.stream, "tok", { subscribeToAudio: true, subscribeToVideo: false });
  });

  session.connect(token, function(err) {
    if (err) console.log(err);
  })

} else {
  console.log("No WebRTC");
  // The client does not support WebRTC.
  // You can display your own message.
}


/*
 * INITIALIZE MAP
 */
var mapOptions = {
  zoom: 17,
  center: new google.maps.LatLng(-22.97982535792792, -43.23314334269914),
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  mapTypeControl: false
};
var map = new google.maps.Map(document.getElementById("map"), mapOptions);

var poly = new google.maps.Polyline({
  map: map,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2
});
var geocoder = new google.maps.Geocoder();
var initialMarker, finalMarker;


/*
 * INITIALIZE SOCKET.IO
 */
var statuses = [];
var socket = io.connect();
socket.on('status', function(status) {
  statuses.push(status);
  status.date = new Date(status.timestamp);
  status.timeString = status.date.toTimeString().split(' ')[0];
  status.latLng = new google.maps.LatLng(status.latitude, status.longitude);

  updateCard(status, statuses.length);
  updatePath(status);
  updateMarkers(status);
});
socket.emit('subscribe', { room: trackingId });

var updateCard = function(status, len) {
  if (status.isFirst || len == 1) {
    document.getElementById('since-time').innerText = status.timeString;
  } else if (status.isOk) {
    document.getElementById('since').className = 'ok';
    document.getElementById('since-text').innerText = 'Em segurança desde ';
    document.getElementById('since-time').innerText = status.timeString;
  }
  document.getElementById('last-update-time').innerText = status.timeString;

  if (len % 10 == 0){
    geocoder.geocode({'location': status.latLng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        document.getElementById('location').innerText = results[0].formatted_address;
      }
    });
  }
};

var updatePath = function(status) {
  poly.getPath().push(status.latLng);
};

var updateMarkers = function(status) {
  if (poly.getPath().length == 1) {
    initialMarker = new google.maps.Marker({
      map: map,
      position: status.latLng
    });
  } else if (poly.getPath().length == 2) {
    finalMarker = new google.maps.Marker({
      map: map,
      position: status.latLng
    });
  } else {
    finalMarker.setPosition(status.latLng);
  }
  map.setCenter(status.latLng);
};
