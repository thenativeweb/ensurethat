'use strict';

var Validator = function () {};

Validator.prototype.isValid = function (value) {
  return typeof value === 'string';
};

Validator.prototype.defaultValue = function () {
  return '';
};

module.exports = Validator;
