'use strict';

var _ = require('underscore');

var match = function (options) {
  var actualType;

  if (Array.isArray(options.value)) {
    actualType = 'array';
  } else {
    actualType = typeof options.value;
  }

  if (actualType === options.expectedType) {
    return {
      typeMatch: true,
      value: options.value
    };
  }

  if (typeof options.expectedType === 'object') {
    // Require matchAll inline in this block to avoid a circular dependency at startup.
    try {
      return {
        typeMatch: true,
        value: require('./matchAll')(_.values(options.value), options.expectedType)
      };
    } catch (e) {
      if (options.isOptional) {
        options.value = options.defaultValue;
        return {
          typeMatch: false,
          value: require('./matchAll')(_.values(options.value), options.expectedType)
        };
      }
      throw e;
    }
  }

  if (options.isOptional) {
    return {
      typeMatch: false,
      value: options.defaultValue
    };
  }

  throw new Error('Argument \'' + options.key + '\' is of type \'' + actualType + '\', but must be of type \'' + options.expectedType + '\'.');
};

module.exports = match;
