'use strict';

module.exports = function () {
  var Validator = function () {};

  Validator.prototype.name = 'boolean';

  Validator.prototype.isValid = function (value) {
    return typeof value === 'boolean';
  };

  Validator.prototype.defaultValue = function () {
    return false;
  };

  return Validator;
};
