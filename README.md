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

### Handling optional arguments

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

### Handling objects

Arguments of type `object` can be seen as a special case. The easiest definition is to specify that an argument needs to be of the correct type.

```javascript
var doSomethingComplex = function () {
  var args = ensure.that(arguments).are({
    options: 'object'
  });
  // ...
};
```

Obviously you can also mark an argument of type `object` as optional, as long as you specify a default value.

```javascript
var doSomethingComplex = function () {
  var args = ensure.that(arguments).are({
    options: [ 'object', { foo: 23, bar: 42 } ]
  });
  // ...
};
```

So far, this has not been very special. The interesting part begins when you replace the `object` specification by a real object, which again is a schema. In this case, node-ensurethat will work recursively.

```javascript
var doSomethingComplex = function () {
  var args = ensure.that(arguments).are({
    options: { foo: 'number', bar: 'number' }
  });
  // ...
};
```

If you need to you can also combine this with optional properties within the object, or even make the object itself optional.

The code in the next sample demonstrates this behavior. If no object is given, an object with property `foo` and value `23` is created. Next, this object is checked against the given schema. As `bar` is missing, but marked as optional, `bar` is added with value `42`. So you'll end up with a perfectly filled object. The only chance to fail is if you specify an object, but no `foo` property.

```javascript
var doSomethingComplex = function () {
  var args = ensure.that(arguments).are({
    options: [ {
      foo: 'number',
      bar: [ 'number', 42 ]
    }, {} ]
  });
  // ...
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