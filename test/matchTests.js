'use strict';

var assert = require('node-assertthat'),
    cases = require('cases');

var match = require('../lib/match');

suite('match', function () {
  test('is a function.', function () {
    assert.that(match, is.ofType('function'));
  });

  test('returns the value if the type is as requested.', cases([
    [ 'foo', 23, 'number' ],
    [ 'foo', 'goloroden', 'string' ],
    [ 'foo', false, 'boolean' ],
    [ 'foo', null, 'object' ],
    [ 'foo', undefined, 'undefined' ],
    [ 'foo', function () {}, 'function' ]
  ], function (key, value, type) {
    assert.that(match({
      key: key,
      value: value,
      expectedType: type
    }), is.equalTo(value));
  }));

  test('returns the default value if the type is not as requested, but a default value is given.', cases([
    [ 'foo', 23, 'string', 'goloroden' ],
    [ 'foo', 'goloroden', 'boolean', false ],
    [ 'foo', false, 'object', null ],
    [ 'foo', null, 'undefined', undefined ],
    [ 'foo', undefined, 'function', function () {} ],
    [ 'foo', function () {}, 'number', 23 ]
  ], function (key, value, type, defaultValue) {
    assert.that(match({
      key: key,
      value: value,
      expectedType: type,
      isOptional: true,
      defaultValue: defaultValue
    }), is.equalTo(defaultValue));
  }));

  test('throws an exception if the type is not as requested, and no default value is given.', cases([
    [ 'foo', 23, 'string', 'Argument \'foo\' is of type \'number\', but must be of type \'string\'.' ],
    [ 'foo', 'goloroden', 'boolean', 'Argument \'foo\' is of type \'string\', but must be of type \'boolean\'.' ],
    [ 'foo', false, 'object', 'Argument \'foo\' is of type \'boolean\', but must be of type \'object\'.' ],
    [ 'foo', null, 'undefined', 'Argument \'foo\' is of type \'object\', but must be of type \'undefined\'.' ],
    [ 'foo', undefined, 'function', 'Argument \'foo\' is of type \'undefined\', but must be of type \'function\'.' ],
    [ 'foo', function () {}, 'number', 'Argument \'foo\' is of type \'function\', but must be of type \'number\'.' ]
  ], function (key, value, type, err) {
    assert.that(function () {
      match({
        key: key,
        value: value,
        expectedType: type
      });
    }, is.throwing(err));
  }));
});