'use strict';

var assert = require('assertthat');

var uuidValidator = require('../../lib/validators/uuid');

suite('uuid', function () {
  test('is a function.', function (done) {
    assert.that(uuidValidator).is.ofType('function');
    done();
  });

  test('returns a function.', function (done) {
    assert.that(uuidValidator()).is.ofType('function');
    done();
  });

  suite('Validator', function () {
    var Validator;

    suiteSetup(function () {
      Validator = uuidValidator();
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
      test('returns a nulled uuid.', function (done) {
        var validator = new Validator();
        assert.that(validator.defaultValue()).is.equalTo('00000000-0000-4000-89ab-000000000000');
        done();
      });
    });

    suite('isValid', function () {
      test('returns true for a uuid.', function (done) {
        var validator = new Validator();
        assert.that(validator.isValid('96dbe607-96ff-400f-b8bd-542511565796')).is.true();
        done();
      });

      test('returns false for a string that is no uuid.', function (done) {
        var validator = new Validator();
        assert.that(validator.isValid('abc')).is.false();
        done();
      });

      test('returns false for something not a string.', function (done) {
        var validator = new Validator();
        assert.that(validator.isValid(23)).is.false();
        done();
      });
    });

    suite('name', function () {
      test('returns uuid.', function (done) {
        var validator = new Validator();
        assert.that(validator.name).is.equalTo('uuid');
        done();
      });
    });
  });
});
