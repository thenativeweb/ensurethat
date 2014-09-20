'use strict';

var verEx = require('verbal-expressions');

module.exports = function () {
  var Validator = function () {};

  Validator.prototype.name = 'uuid';

  Validator.prototype.isValid = function (value) {
    var regex = verEx()
      .startOfLine()
        .range('0', '9', 'a', 'f').repeatPrevious(8).then('-')
        .range('0', '9', 'a', 'f').repeatPrevious(4).then('-')
        .range('0', '9', 'a', 'f').repeatPrevious(4).then('-')
        .range('0', '9', 'a', 'f').repeatPrevious(4).then('-')
        .range('0', '9', 'a', 'f').repeatPrevious(12)
      .endOfLine()
        .searchOneLine()
        .stopAtFirst()
        .withAnyCase();

    if (typeof value !== 'string') {
      return false;
    }

    return regex.test(value);
  };

  Validator.prototype.defaultValue = function () {
    return '00000000-0000-4000-89ab-000000000000';
  };

  return Validator;
};
