'use strict';

var assert = require('node-assertthat');

var matchAll = require('../lib/matchAll');

suite('matchAll', function () {
  test('is a function.', function () {
    assert.that(matchAll, is.ofType('function'));
  });

  test('returns the values if all types are as requested.', function () {
    assert.that(matchAll([ 23, 42 ], {
      first: 'number',
      second: 'number'
    }), is.equalTo({
      first: 23,
      second: 42
    }));
  });

  test('returns the values and fills in default values for missing optional parameters.', function () {
    assert.that(matchAll([ 23, 42 ], {
      first: 'number',
      second: 'number',
      third: [ 'number', 65 ]
    }), is.equalTo({
      first: 23,
      second: 42,
      third: 65
    }));
  });

  test('throws an exception if a non-optional parameter is missing.', function () {
    assert.that(function () {
      matchAll([ 23 ], {
        first: 'number',
        second: 'number',
        third: [ 'number', 65 ]
      });
    }, is.throwing('Argument \'second\' is of type \'undefined\', but must be of type \'number\'.'));
  });
});
