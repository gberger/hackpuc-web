"use strict";

var _ = require('lodash');

var config = require('../../config/config');
var client = require('twilio')(config.twilio.sid, config.twilio.secret);

exports.send = function(numbers, body, cb) {
  if (!_.isArray(numbers)) {
    numbers = [numbers];
  }

  for (var number of numbers) {
    client.messages.create({
        body: body,
        to: number,
        from: config.twilio.number
      }, function(err, message) {
        if (err) console.log(err.message);
        console.log(message);
      }
    );
  }
};
