'use strict';

var assert = require('assertthat');

var booleanValidator = require('../../lib/validators/boolean');

suite('boolean', function () {
  test('is a function.', function (done) {
    assert.that(booleanValidator).is.ofType('function');
    done();
  });

  test('returns a function.', function (done) {
    assert.that(booleanValidator()).is.ofType('function');
    done();
  });

  suite('Validator', function () {
    var Validator;

    suiteSetup(function () {
      Validator = booleanValidator();
    });

    test('is a function.', function (done) {
      assert.that(Validator).is.ofType('function');
      done();
    });

    test('returns a validator.', function (done) {
      var validator = new Validator();
      assert.that(validator).is.ofType('object');
      assert.that(validator.isValid).is.ofType('function');
      assert.that(validator.defaultValue).is.ofType('function');
      done();
    });

    suite('defaultValue', function () {
      test('returns false.', function (done) {
        var validator = new Validator();
        assert.that(validator.defaultValue()).is.false();
        done();
      });
    });

    suite('isValid', function () {
      test('returns true for true.', function (done) {
        var validator = new Validator();
        assert.that(validator.isValid(true)).is.true();
        done();
      });

      test('returns true for false.', function (done) {
        var validator = new Validator();
        assert.that(validator.isValid(false)).is.true();
        done();
      });

      test('returns false for something not a boolean.', function (done) {
        var validator = new Validator();
        assert.that(validator.isValid(23)).is.false();
        done();
      });
    });

    suite('name', function () {
      test('returns boolean.', function (done) {
        var validator = new Validator();
        assert.that(validator.name).is.equalTo('boolean');
        done();
      });
    });
  });
});
