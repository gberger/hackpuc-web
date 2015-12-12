'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Alert = mongoose.model('Alert');
var sms = require('../services/sms');

exports.loadAlert = function(req, res, next) {
  var id = req.params.id;
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
  var numbers = _.map(alert.contacts, (c) => c.number);
  sms.send(numbers, alert.message);
};
