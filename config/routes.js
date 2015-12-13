'use strict';

var pages = require('../app/controllers/pages');
var api = require('../app/controllers/api');


module.exports = function (app) {

  app.get('/t/:id', pages.trackingPage);
  app.get('/heatmap', pages.heatmapPage);

  app.post('/alerts', api.createAlert);
  app.get('/alerts/:id', api.loadAlert, api.viewAlert);
  app.post('/alerts/:id/fire', api.loadAlert, api.fireAlert);
  app.post('/alerts/:id/fire/:firingId/status', api.loadFiring, api.updateFiringStatus);
  app.post('/alerts/:id/fire/:firingId/ok', api.loadFiring, api.signalFirerOk);


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
