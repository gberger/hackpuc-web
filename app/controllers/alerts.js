'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Alert = mongoose.model('Alert');
var Firing = mongoose.model('Firing');
var Status = mongoose.model('Status');
var sms = require('../services/sms');

exports.loadAlert = function(req, res, next) {
  var id = req.params.id || req.params.alertId;
  Alert.findById(id, function(err, alert) {
    if (err) {
      return res.json(404, {
        message: 'Error finding alert',
        error: err
      });
    }
    req.alert = alert;
    next();
  })
};

exports.loadFiring = function(req, res, next) {
  var id = req.params.firingId;
  Firing.findById(id, function(err, firing) {
    if (err) {
      return res.json(404, {
        message: 'Error finding firing',
        error: err
      });
    }
    req.firing = firing;
    next();
  })
};



exports.create = function(req, res, next) {
  var alert = new Alert(req.body.alert);

  alert.save(function(err, alert) {
    if (err) {
      return res.json(500, {
        message: 'Error saving alert',
        error: err
      });
    }
    return res.json({
      message: 'saved',
      id: alert._id,
      alert: alert
    })
  });
};

exports.view = function(req, res, next) {
  return res.json({
    alert: req.alert
  })
};


exports.fire = function(req, res, next) {
  var alert = req.alert;
  var firing = new Firing({
    alert: alert
  });

  firing.save(function(err, firing) {
    if (err) {
      return res.json(500, {
        message: "Error firing alert",
        error: err
      })
    }

    var numbers = _.map(alert.contacts, (c) => c.number);
    sms.send(numbers, alert.message);

    return res.json({
      message: 'fired',
      firing: firing
    });
  })
};

exports.updateStatus = function(req, res, next) {
  var firing = req.firing;
  var status = new Status({
    firing: firing,
    longitude: req.body.status.longitude,
    latitude: req.body.status.latitude
  });

  status.save(function(err, status) {
    // Concise response since this is polled frequently
    if (err) {
      return res.sendStatus(500)
    }
    return res.sendStatus(200);
  });
};
