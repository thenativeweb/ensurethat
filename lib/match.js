'use strict';

var match = function (options) {
  var actualType = typeof options.value;

  if (actualType === options.expectedType) {
    return options.value;
  }

  if (options.isOptional) {
    return options.defaultValue;
  }

  throw new Error('Argument \'' + options.key + '\' is of type \'' + actualType + '\', but must be of type \'' + options.expectedType + '\'.');
};

module.exports = match;