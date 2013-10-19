'use strict';

var assert = require('node-assertthat');

var ensure = require('../lib/ensure');

suite('ensure', function () {
  test('is an object.', function () {
    assert.that(ensure, is.ofType('object'));
  });

  suite('that', function () {
    test('is a function.', function () {
      assert.that(ensure.that, is.ofType('function'));
    });

    test('returns the values if all types are as requested.', function () {
      var args;

      (function () {
        args = ensure.that(arguments).are({ first: 'number', second: 'number' });
      })(23, 42);

      assert.that(args, is.equalTo({ first: 23, second: 42 }));
    });

    test('returns the values and adds default values for optional parameters.', function () {
      var args;

      (function () {
        args = ensure.that(arguments).are({ first: 'number', second: [ 'number', 42 ]});
      })(23);

      assert.that(args, is.equalTo({ first: 23, second: 42 }));
    });

    test('returns the values and adds default values for optional parameters in between.', function () {
      var args;

      (function () {
        args = ensure.that(arguments).are({ first: 'number', second: [ 'number', 42 ], third: 'string' });
      })(23, 'foo');

      assert.that(args, is.equalTo({ first: 23, second: 42, third: 'foo' }));
    });

    test('throws an exception for missing non-optional parameters.', function () {
      assert.that(function () {
        (function () {
          ensure.that(arguments).are({ first: 'number', second: 'number', third: 'string' });
        })(23, 'foo');
      }, is.throwing('Argument \'second\' is of type \'string\', but must be of type \'number\'.'));
    });

    suite('object', function () {
      test('returns the object if the requested type is object.', function () {
        var args;

        (function () {
          args = ensure.that(arguments).are({ options: 'object' });
        })({
          foo: 23,
          bar: 42
        });

        assert.that(args, is.equalTo({ options: { foo: 23, bar: 42 }}));
      });

      test('returns the default value for optional objects.', function () {
        var args;

        (function () {
          args = ensure.that(arguments).are({ options: [ 'object', { foo: 23, bar: 42 }]});
        })();

        assert.that(args, is.equalTo({ options: { foo: 23, bar: 42 }}));
      });

      test('throws an exception if a non-optional object is missing.', function () {
        assert.that(function () {
          (function () {
            ensure.that(arguments).are({ options: 'object' });
          })();
        }, is.throwing('Argument \'options\' is of type \'undefined\', but must be of type \'object\'.'));
      });

      suite('with recursion', function () {
        test('returns the object if the requested type is object.', function () {
          var args;

          (function () {
            args = ensure.that(arguments).are({ options: { foo: 'number', bar: 'number' }});
          })({
            foo: 23,
            bar: 42
          });

          assert.that(args, is.equalTo({ options: { foo: 23, bar: 42 }}));
        });

        test('returns an optional object with an optional sub-object.', function () {
          var args;

          (function () {
            args = ensure.that(arguments).are({ options: [{ foo: [ 'number', 23 ], bar: [ 'number', 42 ]}, {} ]});
          })();

          assert.that(args, is.equalTo({ options: { foo: 23, bar: 42 }}));
        });

        test('returns an optional object with a partially optional sub-object.', function () {
          var args;

          (function () {
            args = ensure.that(arguments).are({ options: [{ foo: 'number', bar: [ 'number', 42 ]}, { foo: 23 }]});
          })();

          assert.that(args, is.equalTo({ options: { foo: 23, bar: 42 }}));
        });

        test('throws an exception on partially optional sub-object.', function () {
          assert.that(function () {
            (function () {
              ensure.that(arguments).are({ options: [ { foo: 'number', bar: [ 'number', 42 ]}, {} ]});
            })({});
          }, is.throwing());
        });
      });
    });
  });
});