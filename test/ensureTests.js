'use strict';

var assert = require('node-assertthat');

var ensure = require('../lib/ensure');

suite('ensure', function () {
  test('is an object.', function (done) {
    assert.that(ensure, is.ofType('object'));
    done();
  });

  suite('that', function () {
    test('is a function.', function (done) {
      assert.that(ensure.that, is.ofType('function'));
      done();
    });

    test('returns an object.', function (done) {
      assert.that(ensure.that([]), is.ofType('object'));
      done();
    });

    test('returns an object with an are function.', function (done) {
      assert.that(ensure.that([]).are, is.ofType('function'));
      done();
    });

    suite('single mandatory argument', function () {
      test('returns the parsed argument for a valid argument.', function (done) {
        var args = ensure.that([ 'bar' ]).are({
          first: 'string'
        });
        assert.that(args, is.equalTo({
          first: 'bar'
        }));
        done();
      });

      test('throws an error for an invalid argument.', function (done) {
        assert.that(function () {
          ensure.that([ 23 ]).are({
            first: 'string'
          });
        }, is.throwing('23 is not: string'));
        done();
      });
    });

    suite('multiple mandatory arguments', function () {
      test('returns the parsed arguments for valid arguments.', function (done) {
        var args = ensure.that([ 'bar', 23 ]).are({
          first: 'string',
          second: 'number'
        });
        assert.that(args, is.equalTo({
          first: 'bar',
          second: 23
        }));
        done();
      });

      test('throws an error if the first argument is invalid.', function (done) {
        assert.that(function () {
          ensure.that([ 42, 23 ]).are({
            first: 'string',
            second: 'number'
          });
        }, is.throwing('42 is not: string'));
        done();
      });

      test('throws an error if the second argument is invalid.', function (done) {
        assert.that(function () {
          ensure.that([ 'bar', 'foo' ]).are({
            first: 'string',
            second: 'number'
          });
        }, is.throwing('foo is not: number'));
        done();
      });
    });
  });
});
