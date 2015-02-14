'use strict';

var assert = require('assertthat');

var ensure = require('../lib/ensure');

suite('ensure', function () {
  test('is an object.', function (done) {
    assert.that(ensure).is.ofType('object');
    done();
  });

  test('exposes built-in validators as properties', function (done) {
    assert.that(ensure.boolean).is.ofType('function');
    assert.that(ensure.function).is.ofType('function');
    assert.that(ensure.number).is.ofType('function');
    assert.that(ensure.object).is.ofType('function');
    assert.that(ensure.string).is.ofType('function');
    assert.that(ensure.uuid).is.ofType('function');
    done();
  });

  suite('that', function () {
    test('is a function.', function (done) {
      assert.that(ensure.that).is.ofType('function');
      done();
    });

    test('returns an object.', function (done) {
      assert.that(ensure.that([])).is.ofType('object');
      done();
    });

    test('returns an object with an are function.', function (done) {
      assert.that(ensure.that([]).are).is.ofType('function');
      done();
    });

    suite('supports validators', function () {
      test('of type string.', function (done) {
        var args = ensure.that([ 'bar' ]).are({
          first: 'string'
        });
        assert.that(args).is.equalTo({
          first: 'bar'
        });
        done();
      });

      test('of type internal function.', function (done) {
        var args = ensure.that([ 'bar' ]).are({
          first: ensure.string()
        });
        assert.that(args).is.equalTo({
          first: 'bar'
        });
        done();
      });

      test('of type custom function.', function (done) {
        var args,
            GreaterThan23 = function () {};

        GreaterThan23.prototype.isValid = function (value) {
          return value > 23;
        };

        GreaterThan23.prototype.defaultValue = function () {
          return 24;
        };

        args = ensure.that([ 42 ]).are({
          first: GreaterThan23
        });
        assert.that(args).is.equalTo({
          first: 42
        });
        done();
      });
    });

    suite('with a single mandatory argument', function () {
      test('returns the parsed argument for a valid argument.', function (done) {
        var args = ensure.that([ 'bar' ]).are({
          first: 'string'
        });
        assert.that(args).is.equalTo({
          first: 'bar'
        });
        done();
      });

      test('throws an error for an invalid argument with a string validator.', function (done) {
        assert.that(function () {
          ensure.that([ 23 ]).are({
            first: 'string'
          });
        }).is.throwing('23 is not: string');
        done();
      });

      test('throws an error for an invalid argument with a function validator.', function (done) {
        assert.that(function () {
          ensure.that([ 23 ]).are({
            first: ensure.string()
          });
        }).is.throwing('23 is not: string');
        done();
      });
    });

    suite('with a single optional argument', function () {
      test('returns the parsed argument for a given argument.', function (done) {
        var args = ensure.that([ 'bar' ]).are({
          first: [ 'string' ]
        });
        assert.that(args).is.equalTo({
          first: 'bar'
        });
        done();
      });

      test('returns the default value for a missing argument.', function (done) {
        var args = ensure.that([]).are({
          first: [ 'string', 'bar' ]
        });
        assert.that(args).is.equalTo({
          first: 'bar'
        });
        done();
      });

      test('returns the default value for a missing argument and a missing default value.', function (done) {
        var args = ensure.that([]).are({
          first: [ 'string' ]
        });
        assert.that(args).is.equalTo({
          first: ''
        });
        done();
      });

      test('throws an error for an invalid argument.', function (done) {
        assert.that(function () {
          ensure.that([ 23 ]).are({
            first: [ 'string' ]
          });
        }).is.throwing('23 could not be matched.');
        done();
      });
    });

    suite('with multiple mandatory arguments', function () {
      test('returns the parsed arguments for valid arguments.', function (done) {
        var args = ensure.that([ 'bar', 23 ]).are({
          first: 'string',
          second: 'number'
        });
        assert.that(args).is.equalTo({
          first: 'bar',
          second: 23
        });
        done();
      });

      test('throws an error if the first argument is invalid.', function (done) {
        assert.that(function () {
          ensure.that([ 42, 23 ]).are({
            first: 'string',
            second: 'number'
          });
        }).is.throwing('42 is not: string');
        done();
      });

      test('throws an error if the second argument is invalid.', function (done) {
        assert.that(function () {
          ensure.that([ 'bar', 'foo' ]).are({
            first: 'string',
            second: 'number'
          });
        }).is.throwing('foo is not: number');
        done();
      });
    });

    suite('with multiple optional arguments', function () {
      suite('where all arguments have the same type', function () {
        test('returns the parsed arguments when all arguments are given.', function (done) {
          var args = ensure.that([ 'foo', 'bar' ]).are({
            first: [ 'string' ],
            second: [ 'string' ]
          });
          assert.that(args).is.equalTo({
            first: 'foo',
            second: 'bar'
          });
          done();
        });

        test('returns the default value for the last missing argument.', function (done) {
          var args = ensure.that([ 'foo' ]).are({
            first: [ 'string', 'foo' ],
            second: [ 'string', 'bar' ]
          });
          assert.that(args).is.equalTo({
            first: 'foo',
            second: 'bar'
          });
          done();
        });

        test('returns the default values for the last missing arguments.', function (done) {
          var args = ensure.that([]).are({
            first: [ 'string', 'foo' ],
            second: [ 'string', 'bar' ]
          });
          assert.that(args).is.equalTo({
            first: 'foo',
            second: 'bar'
          });
          done();
        });
      });

      suite('where arguments have different types', function () {
        test('returns the parsed arguments when all arguments are given.', function (done) {
          var args = ensure.that([ 23, 'bar' ]).are({
            first: [ 'number' ],
            second: [ 'string' ]
          });
          assert.that(args).is.equalTo({
            first: 23,
            second: 'bar'
          });
          done();
        });

        test('returns the default value for the last missing argument.', function (done) {
          var args = ensure.that([ 23 ]).are({
            first: [ 'number', 42 ],
            second: [ 'string', 'bar' ]
          });
          assert.that(args).is.equalTo({
            first: 23,
            second: 'bar'
          });
          done();
        });

        test('returns the default values for multiple last missing arguments.', function (done) {
          var args = ensure.that([]).are({
            first: [ 'number', 42 ],
            second: [ 'string', 'bar' ]
          });
          assert.that(args).is.equalTo({
            first: 42,
            second: 'bar'
          });
          done();
        });

        test('returns the default value for the last missing argument of a type.', function (done) {
          var args = ensure.that([ 'foo' ]).are({
            first: [ 'number', 42 ],
            second: [ 'string', 'bar' ]
          });
          assert.that(args).is.equalTo({
            first: 42,
            second: 'foo'
          });
          done();
        });

        test('throws an error when a missing value is not in the end of a type.', function (done) {
          assert.that(function () {
            ensure.that([ 'foo', 'bar' ]).are({
              first: 'string',
              second: [ 'string' ],
              third: 'string'
            });
          }).is.throwing('undefined is not: string');
          done();
        });
      });
    });

    suite('with mixed mandatory and optional arguments', function () {
      test('returns the correct values.', function (done) {
        var args = ensure.that([ 42, 12, 'foo' ]).are({
          first: 'number',
          second: 'number',
          third: [ 'number', 23 ],
          fourth: 'string',
          fifth: [ 'string', 'bar' ]
        });
        assert.that(args).is.equalTo({
          first: 42,
          second: 12,
          third: 23,
          fourth: 'foo',
          fifth: 'bar'
        });
        done();
      });
    });
  });
});
