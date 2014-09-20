'use strict';

module.exports = function () {
  var Validator = function () {};

  Validator.prototype.name = 'function';

  Validator.prototype.isValid = function (value) {
    return typeof value === 'function';
  };

  Validator.prototype.defaultValue = function () {
    return function () {};
  };

  return Validator;
};
