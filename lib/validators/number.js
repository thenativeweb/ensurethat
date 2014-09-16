'use strict';

var Validator = function () {};

Validator.prototype.isValid = function (value) {
  return typeof value === 'number';
};

module.exports = Validator;
