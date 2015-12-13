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



exports.createAlert = function(req, res, next) {
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

exports.viewAlert = function(req, res, next) {
  return res.json({
    alert: req.alert
  })
};


exports.fireAlert = function(req, res, next) {
  var alert = req.alert;
  var openTok = req.openTok;

  openTok.createSession({mediaMode:'routed', archiveMode:'always'}, function(err, session) {
    if (err) console.log(err);

    var firing = new Firing({
      alert: alert,
      openTokSessionId: session.sessionId
    });

    firing.save(function(err, firing) {
      if (err) {
        return res.json(500, {
          message: "Error firing alert",
          error: err
        })
      }

      var numbers = _.map(alert.contacts, (c) => c.number);
      var message = alert.message + " " + firing.getUrl();
      sms.send(numbers, message);

      new Status({
        firing: firing,
        longitude: req.body.status.longitude,
        latitude: req.body.status.latitude,
        isFirstStatus: true
      }).save(function(err, status) {
        if (err) console.log(err);
      });

      return res.json({
        message: 'fired',
        firing: firing,
        openTok: {
          sessionId: session.sessionId,
          token: openTok.generateToken(session.sessionId, { role: 'publisher' })
        }
      });
    })
  });
};

exports.updateFiringStatus = function(req, res, next) {
  var firing = req.firing;
  var status = new Status({
    firing: firing,
    longitude: req.body.status.longitude,
    latitude: req.body.status.latitude,
    isOk: req.body.status.isOk
  });

  status.save(function(err, status) {
    // Concise response since this is polled frequently
    if (err) {
      return res.sendStatus(500)
    }
    req.io.in(firing._id).emit('status', status);
    return res.sendStatus(200);
  });
};

exports.signalFirerOk = function(req, res, next) {
  var firing = req.firing;
  var status = new Status({
    firing: firing,
    longitude: req.body.status.longitude,
    latitude: req.body.status.latitude,
    isOk: true
  });

  status.save(function(err, status) {
    if (err) {
      return res.sendStatus(500)
    }

    req.io.in(firing._id).emit('status', status);

    firing.isOk = true;
    firing.save(function(err, firing) {
      if (err) {
        return err.sendStatus(500)
      }
      return res.sendStatus(200);
    });
  });
};
