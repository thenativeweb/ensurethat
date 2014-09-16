'use strict';

var assert = require('node-assertthat');

var Validator = require('../../lib/validators/number');

suite('number', function () {
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
    test('returns true for a number.', function (done) {
      var validator = new Validator();
      assert.that(validator.isValid(23), is.true());
      done();
    });

    test('returns true for 0.', function (done) {
      var validator = new Validator();
      assert.that(validator.isValid(0), is.true());
      done();
    });

    test('returns true for a negative number.', function (done) {
      var validator = new Validator();
      assert.that(validator.isValid(-42), is.true());
      done();
    });

    test('returns false for something not a number.', function (done) {
      var validator = new Validator();
      assert.that(validator.isValid('foo'), is.false());
      done();
    });
  });
});
