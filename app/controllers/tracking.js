'use strict';

exports.trackingPage = function(req, res) {
  res.render('tracking', {
    trackingId: req.params.id
  });
};
