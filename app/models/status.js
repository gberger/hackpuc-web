"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var StatusSchema = new Schema({
  firing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Firing'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  longitude: { type: Number },
  latitude: { type: Number }
});


StatusSchema.method({

});


StatusSchema.static({

});


mongoose.model('Status', StatusSchema);
