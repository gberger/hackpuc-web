'use strict';

var mongoose = require('mongoose');
var Firing = mongoose.model('Firing');
var Status = mongoose.model('Status');

exports.trackingPage = function(req, res) {
  Firing.findOne({sh: req.params.sh}, function(err, firing) {
    if (err) next();
    Status.find({firing: firing}).sort({timestamp: 'ascending'}).exec(function(err, statuses) {
      if (err) next();
      res.render('pages/tracking', {
        sh: req.params.sh,
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
    if (err) next();

    res.render('pages/heatmap', {
      statuses: statuses
    });
  });
};