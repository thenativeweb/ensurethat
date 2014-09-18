'use strict';

var assert = require('node-assertthat');

var Validator = require('../../lib/validators/function');

suite('function', function () {
  test('is a function.', function (done) {
    assert.that(Validator, is.ofType('function'));
    done();
  });

  test('returns a validator.', function (done) {
    var validator = new Validator();
    assert.that(validator, is.ofType('object'));
    assert.that(validator.isValid, is.ofType('function'));
    assert.that(validator.defaultValue, is.ofType('function'));
    done();
  });

  suite('defaultValue', function () {
    test('returns a no-op function.', function (done) {
      var validator = new Validator();
      assert.that(validator.defaultValue(), is.equalTo(function () {}));
      done();
    });
  });

  suite('isValid', function () {
    test('returns true for a function.', function (done) {
      var validator = new Validator();
      assert.that(validator.isValid(function () {}), is.true());
      done();
    });

    test('returns false for something not a function.', function (done) {
      var validator = new Validator();
      assert.that(validator.isValid(23), is.false());
      done();
    });
  });
});
