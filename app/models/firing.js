"use strict";

var unique = require("shorthash").unique;
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
  },
  openTokSessionId: { type: String },
  isOk: { type: Boolean, default: false },
  sh: { type: String }
});


FiringSchema.method({
  getUrl: function() {
    return config.baseUrl + "/t/" + this.sh;
  }
});


FiringSchema.static({

});


FiringSchema.pre('save', function(next) {
  this.sh = unique(this._id.toString());
  next();
});


mongoose.model('Firing', FiringSchema);

