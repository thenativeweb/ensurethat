'use strict';

var matchAll = require('./matchAll');

var ensure = {
  that: function (args) {
    args = Array.prototype.slice.call(args);

    return {
      are: function (schema) {
        return matchAll(args, schema);
      }
    };
  }
};

module.exports = ensure;
