'use strict';

var request = require('request-promise');

var baseUrl = 'http://localhost:3000';
var coords = require('./demo-coords.json');


var alertId, firingId;

console.log("Criando alerta...");
request({
  uri: '/alerts',
  baseUrl: baseUrl,
  method: 'POST',
  json: true,
  body: {
    alert: {
      name: "João Vicente",
      contacts: [
        {
          name: "Guilherme",
          number: "+5521996960420"
        }
      ],
      message: "Me ajuda! Estou em uma situação de perigo."
    }
  }
}).then(function(body) {
  alertId = body.alert._id;
  console.log("Alerta criado com id: " + alertId);
}).then(function() {
  console.log("Disparando alerta!");

  return request({
    uri: '/alerts/' + alertId + '/fire',
    baseUrl: baseUrl,
    method: 'POST',
    json: true,
    body: {
      status: coords[0]
    }
  });
}).then(function(body) {
  firingId = body.firing._id;
  var interval = 1200;

  for (var i = 1; i < coords.length; i++) {
    setTimeout(function (j) {
      request({
        uri: '/alerts/' + alertId + '/fire/' + firingId + (j == coords.length - 1 ? '/ok' : '/status'),
        baseUrl: baseUrl,
        method: 'POST',
        json: true,
        body: {
          status: {
            latitude: coords[j].latitude,
            longitude: coords[j].longitude
          }
        }
      })
    }, interval * i, i);
  }
});
