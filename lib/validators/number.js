'use strict';

var Validator = function () {};

Validator.prototype.isValid = function (value) {
  return typeof value === 'number';
};

Validator.prototype.defaultValue = function () {
  return 0;
};

module.exports = Validator;
