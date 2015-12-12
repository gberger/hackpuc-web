
/**
 * Module dependencies.
 */

var path = require('path');
var extend = require('util')._extend;

var development = require('./env/development');
var test = require('./env/test');
var production = require('./env/production');

var defaults = {
  root: path.normalize(__dirname + '/..'),
  twilio: {
    sid: process.env.TWILIO_SID,
    secret: process.env.TWILIO_SECRET,
    number: "+1 551-224-0210"
  },
  openTok: {
    key: process.env.OPENTOK_KEY,
    secret: process.env.OPENTOK_SECRET
  }
};

/**
 * Expose
 */

module.exports = {
  development: extend(development, defaults),
  test: extend(test, defaults),
  production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];
