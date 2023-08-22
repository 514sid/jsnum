# Num (JS)
![Tests](https://github.com/514sid/jsnum/actions/workflows/test.yml/badge.svg)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/514sid/jsnum/pulls)

TypeScript port of an accurate [PHP helper](https://github.com/514sid/num) for parsing numbers from strings with support for various thousands and decimal separators.

## Installation

```
$ npm install @514sid/jsnum
```

## What It Does

The built-in JS functions `parseInt()` and `parseFloat()` may not always correctly handle varying numeric value formats based on regional standards.

```js
parseFloat("1 234 567.89")  // 1
parseInt("1,234.56")        // 1
```

With the `Num` helper, you can achieve the desired functionality.

You have the option to provide the decimal separator to the `int()` or `float()` methods.

Alternatively, you can allow the `Num` helper to make an educated guess if you're unsure about the exact separator used in a specific string representing a numeric value.
```js
import { Num, decimalSeparators } from '@514sid/jsnum'

Num.float('1,234,567.89', decimalSeparators.point) // 1234567.89
Num.float('1.234.567,89', decimalSeparators.comma) // 1234567.89
// or
Num.float('1,234,567.89')  // 1234567.89
Num.float('1.234.567,89')  // 1234567.89
Num.float(123)             // 123.0

Num.int('1,234,567.89')    // 1234567
Num.int('1.234.567,89')    // 1234567
Num.int(123.45)            // 123

Num.float('text')  // 0
Num.int('text')    // 0
```

## License

[MIT](LICENSE)
