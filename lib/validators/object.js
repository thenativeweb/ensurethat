'use strict';

module.exports = function () {
  var Validator = function () {};

  Validator.prototype.name = 'object';

  Validator.prototype.isValid = function (value) {
    return typeof value === 'object';
  };

  Validator.prototype.defaultValue = function () {
    return null;
  };

  return Validator;
};
