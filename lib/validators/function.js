'use strict';

var Validator = function () {};

Validator.prototype.isValid = function (value) {
  return typeof value === 'function';
};

Validator.prototype.defaultValue = function () {
  return function () {};
};

module.exports = Validator;
