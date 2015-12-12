"use strict";

var heatmapData = statuses.map(function(status) {
  return new google.maps.LatLng(status.latitude, status.longitude)
});


var map = new google.maps.Map(document.getElementById('map'), {
  center: heatmapData[0],
  zoom: 13,
  mapTypeId: google.maps.MapTypeId.ROADMAP
});

var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatmapData
});
heatmap.setMap(map);
