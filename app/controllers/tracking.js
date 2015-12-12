'use strict';

var mongoose = require('mongoose');
var Firing = mongoose.model('Firing');
var Status = mongoose.model('Status');

exports.trackingPage = function(req, res) {
  Firing.findById(req.params.id, function(err, firing) {
    if (err) next();
    res.render('tracking', {
      trackingId: req.params.id,
      openTok: {
        sessionId: firing.openTokSessionId,
        token: req.openTok.generateToken(firing.openTokSessionId, { role: 'subscriber' })
      }
    });
  });
};

exports.heatmapPage = function(req, res) {
  Status.find({ isFirstStatus: true }, function(err, statuses) {
    if (err) console.log(err);
    console.log(statuses);

    res.render('heatmap', {
      statuses: statuses
    });
  });
};