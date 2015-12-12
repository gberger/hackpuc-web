'use strict';

var mongoose = require('mongoose');
var Firing = mongoose.model('Firing');

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
