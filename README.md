# node-ensurethat

node-ensurethat makes handling arguments a breeze.

## Installation

    $ npm install node-ensurethat

## Quick start

First you need to add a reference to node-ensurethat to your application.

```javascript
var ensure = require('node-ensurethat');
```

Now you are able to use the `that` function to describe the function's arguments using validators. Currently, the following validators are supported.

- `boolean`
- `function`
- `number`
- `string`
- `uuid`

In case at least one validator fails, node-ensurethat will throw an error with an appropriate error message.

If everything is fine, the `that` function returns an object which contains a property for each argument.

```javascript
var add = function() {
  var args = ensure.that(arguments).are({
    first: 'number',
    second: 'number'
  });

  return args.first + args.second;
};
```

*Please note that as the arguments are accessed using the `arguments` and `args` variables, you may skip specifying the arguments within the function's signature completely.*

## Running the build

This module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, this also analyses the code. To run Grunt, go to the folder where you have installed node-ensurethat and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt

## License

The MIT License (MIT)
Copyright (c) 2013-2014 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
