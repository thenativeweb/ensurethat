'use strict';

var Validator = function () {};

Validator.prototype.isValid = function (value) {
  return typeof value === 'string';
};

module.exports = Validator;
