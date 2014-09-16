'use strict';

var Validator = function () {};

Validator.prototype.isValid = function (value) {
  var regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  if (typeof value !== 'string') {
    return false;
  }

  return regex.test(value);
};

module.exports = Validator;
