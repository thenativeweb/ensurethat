'use strict';

var _ = require('underscore');

var match = require('./match');

var matchAll = function (args, schema) {
  var i = 0,
      keys = _.keys(schema),
      matchedArgs = {};

  keys.forEach(function (key) {
    var matched,
        value = schema[ key ];

    matched = match({
      key: key,
      value: args[ i ],
      expectedType: _.flatten([ value ])[ 0 ],
      isOptional: _.isArray(value),
      defaultValue: _.flatten([ value ], 1)[ 1 ]
    });

    if (matched.typeMatch === true) {
      i++;
    }
    matchedArgs[ key ] = matched.value;
  });

  return matchedArgs;
};

module.exports = matchAll;
