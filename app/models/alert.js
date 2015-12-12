"use strict";
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * User schema
 */

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


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

AlertSchema.method({

});

/**
 * Statics
 */

AlertSchema.static({

});

/**
 * Register
 */

mongoose.model('Alert', AlertSchema);
