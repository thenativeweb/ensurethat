'use strict';

module.exports = function () {
  var Validator = function () {};

  Validator.prototype.name = 'number';

  Validator.prototype.isValid = function (value) {
    return typeof value === 'number';
  };

  Validator.prototype.defaultValue = function () {
    return 0;
  };

  return Validator;
};
