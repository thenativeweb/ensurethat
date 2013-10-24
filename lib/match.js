'use strict';

var _ = require('underscore');

var match = function (options) {
  if (Array.isArray(options.value)) {
    var actualType = 'array';
  }
  else {
    var actualType = typeof options.value;
  }

  if (actualType === options.expectedType) {
    return options.value;
  }

  if (typeof options.expectedType === 'object') {
    // Require matchAll inline in this block to avoid a circular dependency at startup.
    try {
      return require('./matchAll')(_.values(options.value), options.expectedType);
    } catch (e) {
      if (options.isOptional) {
        options.value = options.defaultValue;
        return require('./matchAll')(_.values(options.value), options.expectedType);
      }
      throw e;
    }
  }

  if (options.isOptional) {
    return options.defaultValue;
  }

  throw new Error('Argument \'' + options.key + '\' is of type \'' + actualType + '\', but must be of type \'' + options.expectedType + '\'.');
};

module.exports = match;
