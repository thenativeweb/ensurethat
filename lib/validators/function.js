'use strict';

var Validator = function () {};

Validator.prototype.isValid = function (value) {
  return typeof value === 'function';
};

module.exports = Validator;
