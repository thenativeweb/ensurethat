# ensurethat

ensurethat validates function arguments.

## Installation

```shell
$ npm install ensurethat
```

## Quick start

First you need to add a reference to ensurethat to your application:

```javascript
const ensure = require('ensurethat');
```

Then you can use it to validate function arguments. A typical use case looks like the following code snippet:

```javascript
const add = function (left, right) {
  ensure.that({ left }).is.number();
  ensure.that({ right }).is.number();

  return left + right;
};
```

In case the argument passes validation, execution continues without further ado. If an argument does *not* pass validation, an exception is thrown.

Depending on the type you want to validate, use the `boolean`, `number`, `object` or `string` function. If you want to allow an argument to be optional, pass in the `isOptional` flag and set it to `true`:

```javascript
ensure.that({ value }).is.number({ isOptional: true });
```

### Using advanced validators

Some types provide advanced validators, i.e. you can check for more than just the type. To use advanced validators, provide them as flags in the same way as you provide `isOptional`.

#### number

| Validator | Description | Default |
|-|-|-|
| minimum | Specifies the minimum value. | `Number.NEGATIVE_INFINITY` |
| maximum | Specifies the maximum value. | `Number.POSITIVE_INFINITY` |

#### object

| Validator | Description | Default |
|-|-|-|
| isNullAllowed | Specifies whether `null` is allowed or not. | `false` |

#### string

| Validator | Description | Default |
|-|-|-|
| minLength | Specifies the minimum length. | `0` |
| maxLength | Specifies the maximum length. | `Number.POSITIVE_INFINITY` |

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```

## License

The MIT License (MIT)
Copyright (c) 2013-2019 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
