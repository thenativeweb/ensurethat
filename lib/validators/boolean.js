'use strict';

var Validator = function () {};

Validator.prototype.isValid = function (value) {
  return typeof value === 'boolean';
};

Validator.prototype.defaultValue = function () {
  return false;
};

module.exports = Validator;
