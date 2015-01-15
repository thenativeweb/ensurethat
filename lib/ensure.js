'use strict';

var path = require('path'),
    util = require('util');

var _ = require('lodash'),
    requireAll = require('require-all');

var validators = requireAll(path.join(__dirname, 'validators'));

var ensure = {};

_.forEach(validators, function (validator, validatorName) {
  ensure[validatorName] = validator;
});

ensure.that = function (args) {
  var passedValues = Array.prototype.slice.call(args);

  return {
    are: function (schema) {
      var argumentName,
          argumentNames = Object.keys(schema),
          defaultValue,
          isOptional,
          passedValue,
          position,
          Validator,
          validator,
          validatorName,
          verifiedArguments = {},
          verifiedArgumentsValues;

      for (position = 0; position < argumentNames.length; position++) {
        argumentName = argumentNames[position];
        passedValue = passedValues[position];

        validatorName = schema[argumentName];
        defaultValue = undefined;
        isOptional = false;

        if (util.isArray(validatorName)) {
          defaultValue = validatorName[1];
          validatorName = validatorName[0];
          isOptional = true;
        }

        if (typeof validatorName === 'string') {
          Validator = validators[validatorName]();
        } else if (typeof validatorName === 'function') {
          Validator = validatorName;
        }
        validator = new Validator();

        if (!defaultValue) {
          defaultValue = validator.defaultValue();
        }

        if (!validator.isValid(passedValue)) {
          if (isOptional) {
            passedValues.splice(position, 0, defaultValue);
            position -= 1;
            continue;
          }

          throw new Error(util.format('%s is not: %s', passedValue, validator.name));
        }

        verifiedArguments[argumentName] = passedValue;
      }

      verifiedArgumentsValues = _.values(verifiedArguments);
      for (position = 0; position < passedValues.length; position++) {
        passedValue = passedValues[position];
        if (!_.contains(verifiedArgumentsValues, passedValue)) {
          throw new Error(util.format('%s could not be matched.', passedValue));
        }
      }

      return verifiedArguments;
    }
  };
};

module.exports = ensure;
