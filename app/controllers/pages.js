'use strict';

var mongoose = require('mongoose');
var Firing = mongoose.model('Firing');
var Status = mongoose.model('Status');

exports.trackingPage = function(req, res) {
  Firing.findById(req.params.id, function(err, firing) {
    if (err) next();
    Status.find({firing: firing}).sort({timestamp: 'ascending'}).exec(function(err, statuses) {
      if (err) console.log(err);
      res.render('pages/tracking', {
        trackingId: req.params.id,
        openTok: {
          sessionId: firing.openTokSessionId,
          token: req.openTok.generateToken(firing.openTokSessionId, { role: 'subscriber' })
        },
        statuses: statuses
      });
    });
  });
};

exports.heatmapPage = function(req, res) {
  Status.find({ isFirstStatus: true }, function(err, statuses) {
    if (err) console.log(err);

    res.render('pages/heatmap', {
      statuses: statuses
    });
  });
};