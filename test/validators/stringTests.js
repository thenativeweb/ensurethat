'use strict';

var assert = require('assertthat');

var stringValidator = require('../../lib/validators/string');

suite('string', function () {
  test('is a function.', function (done) {
    assert.that(stringValidator).is.ofType('function');
    done();
  });

  test('returns a function.', function (done) {
    assert.that(stringValidator()).is.ofType('function');
    done();
  });

  suite('Validator', function () {
    var Validator;

    suiteSetup(function () {
      Validator = stringValidator();
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
      test('returns an empty string.', function (done) {
        var validator = new Validator();
        assert.that(validator.defaultValue()).is.equalTo('');
        done();
      });
    });

    suite('isValid', function () {
      test('returns true for a string.', function (done) {
        var validator = new Validator();
        assert.that(validator.isValid('foo')).is.true();
        done();
      });

      test('returns true for an empty string.', function (done) {
        var validator = new Validator();
        assert.that(validator.isValid('')).is.true();
        done();
      });

      test('returns false for something not a string.', function (done) {
        var validator = new Validator();
        assert.that(validator.isValid(23)).is.false();
        done();
      });
    });

    suite('name', function () {
      test('returns string.', function (done) {
        var validator = new Validator();
        assert.that(validator.name).is.equalTo('string');
        done();
      });
    });
  });
});
