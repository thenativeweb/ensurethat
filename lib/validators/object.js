'use strict';

var Validator = function () {};

Validator.prototype.isValid = function (value) {
  return typeof value === 'object';
};

module.exports = Validator;
