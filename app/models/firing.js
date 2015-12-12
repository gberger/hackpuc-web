"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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

});


FiringSchema.static({

});


mongoose.model('Firing', FiringSchema);
