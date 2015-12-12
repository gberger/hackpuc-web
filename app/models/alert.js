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
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  contacts: [
    {
      name: { type: String, default: '' },
      number: { type: String, default: '' }
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
