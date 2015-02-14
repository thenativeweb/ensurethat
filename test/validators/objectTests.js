'use strict';

var assert = require('assertthat');

var objectValidator = require('../../lib/validators/object');

suite('object', function () {
  test('is a function.', function (done) {
    assert.that(objectValidator).is.ofType('function');
    done();
  });

  test('returns a function.', function (done) {
    assert.that(objectValidator()).is.ofType('function');
    done();
  });

  suite('Validator', function () {
    var Validator;

    suiteSetup(function () {
      Validator = objectValidator();
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
      test('returns null.', function (done) {
        var validator = new Validator();
        assert.that(validator.defaultValue()).is.equalTo(null);
        done();
      });
    });

    suite('isValid', function () {
      test('returns true for an object.', function (done) {
        var validator = new Validator();
        assert.that(validator.isValid({ foo: 'bar' })).is.true();
        done();
      });

      test('returns true for an empty object.', function (done) {
        var validator = new Validator();
        assert.that(validator.isValid({})).is.true();
        done();
      });

      test('returns true for null.', function (done) {
        var validator = new Validator();
        assert.that(validator.isValid({})).is.true();
        done();
      });

      test('returns false for something not an object.', function (done) {
        var validator = new Validator();
        assert.that(validator.isValid(23)).is.false();
        done();
      });
    });

    suite('name', function () {
      test('returns object.', function (done) {
        var validator = new Validator();
        assert.that(validator.name).is.equalTo('object');
        done();
      });
    });
  });
});
