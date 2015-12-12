"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var config = require('../../config/config');


var FiringSchema = new Schema({
  alert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alert'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});


FiringSchema.method({
  getUrl: function() {
    return config.baseUrl + "/t/" + this._id;
  }
});


FiringSchema.static({

});


mongoose.model('Firing', FiringSchema);
