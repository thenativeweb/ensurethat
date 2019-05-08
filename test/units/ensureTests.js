'use strict';

const assert = require('assertthat');

const ensure = require('../../lib/ensure');

suite('ensure', () => {
  test('is an object.', async () => {
    assert.that(ensure).is.ofType('object');
  });

  suite('that', () => {
    test('is a function.', async () => {
      assert.that(ensure.that).is.ofType('function');
    });

    test('throws an error if arguments are missing.', async () => {
      assert.that(() => {
        ensure.that();
      }).is.throwing('Arguments are missing.');
    });

    test('throws an error if arguments is not an object.', async () => {
      assert.that(() => {
        ensure.that(23);
      }).is.throwing('Arguments must be of type object.');
    });

    test('throws an error if arguments does not have any properties.', async () => {
      assert.that(() => {
        ensure.that({});
      }).is.throwing('Arguments must have at least one property.');
    });

    suite('is', () => {
      test('is an object.', async () => {
        assert.that(ensure.that({ foo: 'bar' }).is).is.ofType('object');
      });

      suite('boolean', () => {
        test('is a function.', async () => {
          assert.that(ensure.that({ foo: true }).is.boolean).is.ofType('function');
        });

        test('does not throw an error if the argument is of type boolean.', async () => {
          assert.that(() => {
            ensure.that({ foo: true }).is.boolean();
          }).is.not.throwing();
        });

        test('throws an error if the argument is not of type boolean.', async () => {
          assert.that(() => {
            ensure.that({ foo: 23 }).is.boolean();
          }).is.throwing(ex =>
            ex.code === 'EARGUMENTTYPEVIOLATION' &&
            ex.message === 'Foo is not a boolean.');
        });

        suite('isOptional', () => {
          suite('is false', () => {
            test('throws an error if the argument is missing.', async () => {
              assert.that(() => {
                ensure.that({ foo: undefined }).is.boolean();
              }).is.throwing(ex =>
                ex.code === 'EARGUMENTMISSING' &&
                ex.message === 'Foo is missing.');
            });
          });

          suite('is true', () => {
            test('does not throw an error if the argument is missing.', async () => {
              assert.that(() => {
                ensure.that({ foo: undefined }).is.boolean({ isOptional: true });
              }).is.not.throwing();
            });
          });
        });
      });

      suite('number', () => {
        test('is a function.', async () => {
          assert.that(ensure.that({ foo: 23 }).is.number).is.ofType('function');
        });

        test('does not throw an error if the argument is of type number.', async () => {
          assert.that(() => {
            ensure.that({ foo: 23 }).is.number();
          }).is.not.throwing();
        });

        test('throws an error if the argument is not of type number.', async () => {
          assert.that(() => {
            ensure.that({ foo: 'bar' }).is.number();
          }).is.throwing(ex =>
            ex.code === 'EARGUMENTTYPEVIOLATION' &&
            ex.message === 'Foo is not a number.');
        });

        suite('isOptional', () => {
          suite('is false', () => {
            test('throws an error if the argument is missing.', async () => {
              assert.that(() => {
                ensure.that({ foo: undefined }).is.number();
              }).is.throwing(ex =>
                ex.code === 'EARGUMENTMISSING' &&
                ex.message === 'Foo is missing.');
            });
          });

          suite('is true', () => {
            test('does not throw an error if the argument is missing.', async () => {
              assert.that(() => {
                ensure.that({ foo: undefined }).is.number({ isOptional: true });
              }).is.not.throwing();
            });
          });
        });

        suite('minimum', () => {
          test('does not throw an error if the argument is large enough.', async () => {
            assert.that(() => {
              ensure.that({ foo: 23 }).is.number({ minimum: 23 });
            }).is.not.throwing();
          });

          test('throws an error if the argument is too small.', async () => {
            assert.that(() => {
              ensure.that({ foo: 23 }).is.number({ minimum: 24 });
            }).is.throwing(ex =>
              ex.code === 'EARGUMENTCONSTRAINTVIOLATION' &&
              ex.message === 'Foo is smaller than 24.');
          });
        });

        suite('maximum', () => {
          test('does not throw an error if the argument is small enough.', async () => {
            assert.that(() => {
              ensure.that({ foo: 23 }).is.number({ maximum: 23 });
            }).is.not.throwing();
          });

          test('throws an error if the argument is too large.', async () => {
            assert.that(() => {
              ensure.that({ foo: 23 }).is.number({ maximum: 22 });
            }).is.throwing(ex =>
              ex.code === 'EARGUMENTCONSTRAINTVIOLATION' &&
              ex.message === 'Foo is larger than 22.');
          });
        });
      });

      suite('object', () => {
        test('is a function.', async () => {
          assert.that(ensure.that({ foo: {}}).is.object).is.ofType('function');
        });

        test('does not throw an error if the argument is of type object.', async () => {
          assert.that(() => {
            ensure.that({ foo: {}}).is.object();
          }).is.not.throwing();
        });

        test('throws an error if the argument is not of type object.', async () => {
          assert.that(() => {
            ensure.that({ foo: 23 }).is.object();
          }).is.throwing(ex =>
            ex.code === 'EARGUMENTTYPEVIOLATION' &&
            ex.message === 'Foo is not an object.');
        });

        suite('isOptional', () => {
          suite('is false', () => {
            test('throws an error if the argument is missing.', async () => {
              assert.that(() => {
                ensure.that({ foo: undefined }).is.object();
              }).is.throwing(ex =>
                ex.code === 'EARGUMENTMISSING' &&
                ex.message === 'Foo is missing.');
            });
          });

          suite('is true', () => {
            test('does not throw an error if the argument is missing.', async () => {
              assert.that(() => {
                ensure.that({ foo: undefined }).is.object({ isOptional: true });
              }).is.not.throwing();
            });
          });
        });

        suite('isNullAllowed', () => {
          suite('is false', () => {
            test('throws an error if the argument is null.', async () => {
              assert.that(() => {
                ensure.that({ foo: null }).is.object();
              }).is.throwing(ex =>
                ex.code === 'EARGUMENTCONSTRAINTVIOLATION' &&
                ex.message === 'Foo is null.');
            });
          });

          suite('is true', () => {
            test('does not throw an error if the argument is null.', async () => {
              assert.that(() => {
                ensure.that({ foo: null }).is.object({ isNullAllowed: true });
              }).is.not.throwing();
            });
          });
        });
      });

      suite('string', () => {
        test('is a function.', async () => {
          assert.that(ensure.that({ foo: 'bar' }).is.string).is.ofType('function');
        });

        test('does not throw an error if the argument is of type string.', async () => {
          assert.that(() => {
            ensure.that({ foo: 'bar' }).is.string();
          }).is.not.throwing();
        });

        test('throws an error if the argument is not of type string.', async () => {
          assert.that(() => {
            ensure.that({ foo: 23 }).is.string();
          }).is.throwing(ex =>
            ex.code === 'EARGUMENTTYPEVIOLATION' &&
            ex.message === 'Foo is not a string.');
        });

        suite('isOptional', () => {
          suite('is false', () => {
            test('throws an error if the argument is missing.', async () => {
              assert.that(() => {
                ensure.that({ foo: undefined }).is.string();
              }).is.throwing(ex =>
                ex.code === 'EARGUMENTMISSING' &&
                ex.message === 'Foo is missing.');
            });
          });

          suite('is true', () => {
            test('does not throw an error if the argument is missing.', async () => {
              assert.that(() => {
                ensure.that({ foo: undefined }).is.string({ isOptional: true });
              }).is.not.throwing();
            });
          });
        });

        suite('minLength', () => {
          test('does not throw an error if the argument is long enough.', async () => {
            assert.that(() => {
              ensure.that({ foo: 'bar' }).is.string({ minLength: 3 });
            }).is.not.throwing();
          });

          test('throws an error if the argument is too short.', async () => {
            assert.that(() => {
              ensure.that({ foo: 'bar' }).is.string({ minLength: 4 });
            }).is.throwing(ex =>
              ex.code === 'EARGUMENTCONSTRAINTVIOLATION' &&
              ex.message === 'Foo has less than 4 characters.');
          });
        });

        suite('maxLength', () => {
          test('does not throw an error if the argument is short enough.', async () => {
            assert.that(() => {
              ensure.that({ foo: 'bar' }).is.string({ maxLength: 3 });
            }).is.not.throwing();
          });

          test('throws an error if the argument is too long.', async () => {
            assert.that(() => {
              ensure.that({ foo: 'bar' }).is.string({ maxLength: 2 });
            }).is.throwing(ex =>
              ex.code === 'EARGUMENTCONSTRAINTVIOLATION' &&
              ex.message === 'Foo has more than 2 characters.');
          });
        });
      });
    });
  });
});
