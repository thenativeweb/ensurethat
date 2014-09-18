'use strict';

var Validator = function () {};

Validator.prototype.isValid = function (value) {
  return typeof value === 'object';
};

Validator.prototype.defaultValue = function () {
  return null;
};

module.exports = Validator;
