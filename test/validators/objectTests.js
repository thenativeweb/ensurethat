'use strict';

var assert = require('node-assertthat');

var Validator = require('../../lib/validators/object');

suite('object', function () {
  test('is a function.', function (done) {
    assert.that(Validator, is.ofType('function'));
    done();
  });

  test('returns a validator.', function (done) {
    var validator = new Validator();
    assert.that(validator, is.ofType('object'));
    assert.that(validator.isValid, is.ofType('function'));
    done();
  });

  suite('isValid', function () {
    test('returns true for an object.', function (done) {
      var validator = new Validator();
      assert.that(validator.isValid({ foo: 'bar' }), is.true());
      done();
    });

    test('returns true for an empty object.', function (done) {
      var validator = new Validator();
      assert.that(validator.isValid({}), is.true());
      done();
    });

    test('returns true for null.', function (done) {
      var validator = new Validator();
      assert.that(validator.isValid({}), is.true());
      done();
    });

    test('returns false for something not an object.', function (done) {
      var validator = new Validator();
      assert.that(validator.isValid(23), is.false());
      done();
    });
  });
});
