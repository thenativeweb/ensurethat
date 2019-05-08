'use strict';

const humanizeString = require('humanize-string');

const {
  ArgumentConstraintViolation,
  ArgumentMissing,
  ArgumentTypeViolation
} = require('./errors');

const ensure = {
  that (args) {
    if (!args) {
      throw new Error('Arguments are missing.');
    }
    if (typeof args !== 'object') {
      throw new Error('Arguments must be of type object.');
    }
    if (Object.keys(args).length === 0) {
      throw new Error('Arguments must have at least one property.');
    }

    return {
      is: {
        boolean ({
          isOptional = false
        } = {}) {
          for (const [ key, value ] of Object.entries(args)) {
            const humanReadableKey = humanizeString(key);

            if (value === undefined) {
              if (isOptional) {
                continue;
              }
              throw new ArgumentMissing(`${humanReadableKey} is missing.`);
            }

            if (typeof value !== 'boolean') {
              throw new ArgumentTypeViolation(`${humanReadableKey} is not a boolean.`);
            }
          }
        },

        number ({
          isOptional = false,
          minimum = Number.NEGATIVE_INFINITY,
          maximum = Number.POSITIVE_INFINITY
        } = {}) {
          for (const [ key, value ] of Object.entries(args)) {
            const humanReadableKey = humanizeString(key);

            if (value === undefined) {
              if (isOptional) {
                continue;
              }
              throw new ArgumentMissing(`${humanReadableKey} is missing.`);
            }

            if (typeof value !== 'number') {
              throw new ArgumentTypeViolation(`${humanReadableKey} is not a number.`);
            }

            if (value < minimum) {
              throw new ArgumentConstraintViolation(`${humanReadableKey} is smaller than ${minimum}.`);
            }
            if (value > maximum) {
              throw new ArgumentConstraintViolation(`${humanReadableKey} is larger than ${maximum}.`);
            }
          }
        },

        object ({
          isOptional = false,
          isNullAllowed = false
        } = {}) {
          for (const [ key, value ] of Object.entries(args)) {
            const humanReadableKey = humanizeString(key);

            if (value === undefined) {
              if (isOptional) {
                continue;
              }
              throw new ArgumentMissing(`${humanReadableKey} is missing.`);
            }

            if (typeof value !== 'object') {
              throw new ArgumentTypeViolation(`${humanReadableKey} is not an object.`);
            }

            if (value === null) {
              if (isNullAllowed) {
                continue;
              }
              throw new ArgumentConstraintViolation(`${humanReadableKey} is null.`);
            }
          }
        },

        string ({
          isOptional = false,
          minLength = 0,
          maxLength = Number.POSITIVE_INFINITY
        } = {}) {
          for (const [ key, value ] of Object.entries(args)) {
            const humanReadableKey = humanizeString(key);

            if (value === undefined) {
              if (isOptional) {
                continue;
              }
              throw new ArgumentMissing(`${humanReadableKey} is missing.`);
            }

            if (typeof value !== 'string') {
              throw new ArgumentTypeViolation(`${humanReadableKey} is not a string.`);
            }

            if (value.length < minLength) {
              throw new ArgumentConstraintViolation(`${humanReadableKey} has less than ${minLength} characters.`);
            }
            if (value.length > maxLength) {
              throw new ArgumentConstraintViolation(`${humanReadableKey} has more than ${maxLength} characters.`);
            }
          }
        }
      }
    };
  }
};

module.exports = ensure;
