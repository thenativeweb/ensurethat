'use strict';

var path = require('path'),
    util = require('util');

var requireAll = require('require-all');

var validators = requireAll(path.join(__dirname, 'validators'));

var ensure = {};

ensure.that = function (args) {
  var passedValues = Array.prototype.slice.call(args);

  return {
    are: function (schema) {
      var argumentName,
          argumentNames = Object.keys(schema),
          passedValue,
          position,
          validator,
          validatorName,
          verifiedArguments = {};

      for (position = 0; position < argumentNames.length; position++) {
        argumentName = argumentNames[ position ];
        passedValue = passedValues[ position ];

        validatorName = schema[ argumentName ];
        validator = new validators[ validatorName ]();

        if (!validator.isValid(passedValue)) {
          throw new Error(util.format('%s is not: %s', passedValue, validatorName));
        }

        verifiedArguments[ argumentName ] = passedValue;
      }

      return verifiedArguments;
    }
  };
};

module.exports = ensure;
