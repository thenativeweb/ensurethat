'use strict';

const defekt = require('defekt');

const errors = defekt([
  'ArgumentConstraintViolation',
  'ArgumentMissing',
  'ArgumentTypeViolation'
]);

module.exports = errors;
