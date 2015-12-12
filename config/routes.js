'use strict';

var tracking = require('../app/controllers/tracking');
var alerts = require('../app/controllers/alerts');


module.exports = function (app) {

  app.get('/t/:id', tracking.trackingPage);
  app.get('/heatmap', tracking.heatmapPage);

  app.post('/alerts', alerts.create);
  app.get('/alerts/:id', alerts.loadAlert, alerts.view);
  app.post('/alerts/:id/fire', alerts.loadAlert, alerts.fire);
  app.post('/alerts/:id/fire/:firingId/status', alerts.loadFiring, alerts.updateStatus);


  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
