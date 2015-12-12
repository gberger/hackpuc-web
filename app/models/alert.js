"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AlertSchema = new Schema({
  name: { type: String, required: true },
  contacts: [
    {
      name: { type: String, default: '' },
      number: { type: String, required: true }
    }
  ],
  message: { type: String, default: 'I need help!' }
});



AlertSchema.method({

});


AlertSchema.static({

});


mongoose.model('Alert', AlertSchema);
