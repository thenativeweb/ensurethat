# node-ensurethat

node-ensurethat makes handling arguments a breeze.

If you have any questions or feedback, feel free to contact me using [@goloroden](https://twitter.com/goloroden) on Twitter.

## Installation

    $ npm install node-ensurethat

## Quick start

Using node-ensurethat is easy. All you need to do is to add a reference to it within your Node.js application:

```javascript
var ensure = require('node-ensurethat');
```

Now you are able to use the `that` function to define the function's arguments. You may skip providing the arguments on the function completely. The `that` function returns an object which contains a property for each argument.

```javascript
var add = function() {
  var args = ensure.that(arguments).are({
    first: 'number',
    second: 'number'
  });

  return args.first + args.second;
};
```

### Optional arguments

You can specify optional parameters. All you need to do is put the required type as well as the default value in square brackets.

```javascript
var add = function() {
  var args = ensure.that(arguments).are({
    first: 'number',
    second: 'number',
    third: [ 'number', 10 ]
  });

  return args.first + args.second + args.third;
};
```

## Running the tests

node-ensurethat has been developed using TDD. To run the tests, go to the folder where you have installed node-ensurethat to and run `npm test`. You need to have [mocha](https://github.com/visionmedia/mocha) installed.

    $ npm test

Additionally, this module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, Grunt also analyses the code using [JSHint](http://www.jshint.com/). To run Grunt, go to the folder where you have installed node-ensurethat and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt

## License

The MIT License (MIT)
Copyright (c) 2013 Golo Roden.
 
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.